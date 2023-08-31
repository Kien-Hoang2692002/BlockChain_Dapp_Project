App = {
    loading: false,
    contracts: {},

    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();       
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
        } else {
        window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
        } catch (error) {
            // User denied account access...
        }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async() =>{
        // Set the current blockchain account
        web3.eth.defaultAccount = web3.eth.accounts[0];
    },

    loadContract: async() =>{
        // Create a JavaScript version of the smart contract
        const diaryApp = await $.getJSON('DiaryApp.json')
        App.contracts.DiaryApp = TruffleContract(diaryApp)
        App.contracts.DiaryApp.setProvider(App.web3Provider)
        
        // Hydrate the smart contract with values from the blockchain
        App.DiaryApp = await App.contracts.DiaryApp.deployed()
    },

    render: async() =>{
        // Prevent double render
         if (App.loading) {
            return
        }

        // Update app loading state
        App.setLoading(true)

        // Render Account
        $('#account').html(App.account)

        // Render diary
        await App.renderDiaries()

        // Update app loading state
        App.setLoading(true)
    },

    renderDiaries: async () => {

        const diaryCount = await App.DiaryApp.diaryCount();
        const $diaryTemplate = $('.diaryTemplate')
        // Render out each task with a new task template
        for (let i = 1; i <= diaryCount; i++){
            // Fetch the task data from the blockchain
            const diary = await App.DiaryApp.diaries(i)
            const diaryId = diary[0].toNumber()
            const diaryContent = diary[1]

            // Create the html 
            const $newDiaryTemplate = $diaryTemplate.clone()
            $newDiaryTemplate.find('.content').html(diaryContent)
            $newDiaryTemplate.find('input').prop('name', diaryId)
                    //   .on('click', App.toggleCompleted)
            // Put the task in the correct list
            $('#diaryList').append($newDiaryTemplate)
            
        // Show
        $newDiaryTemplate.show()
        }
    },

    // createDiary: async () => {
    //     App.setLoading(true)
    //     const content = $('#newTask').val()
    //     await App.diaryApp.createDiary(content)
    //     window.location.reload()
    // },

    // toggleCompleted: async (e) => {
    //     App.setLoading(true)
    //     const taskId = e.target.name
    //     await App.todoList.toggleCompleted(taskId)
    //     window.location.reload()
    // },

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
          loader.show()
          content.hide()
        } else {
          loader.hide()
          content.show()
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})

