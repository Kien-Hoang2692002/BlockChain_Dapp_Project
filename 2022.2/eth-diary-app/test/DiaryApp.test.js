const DiaryApp = artifacts.require('./DiaryApp.sol')

contract('DiaryApp', (accounts) => {
  before(async () => {
    this.diaryApp = await DiaryApp.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.diaryApp.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists diaries', async () => {
    const diaryCount = await this.diaryApp.diaryCount()
    const diary = await this.diaryApp.diaries(diaryCount)
    assert.equal(diary.id.toNumber(), diaryCount.toNumber())
    assert.equal(diary.content, 'Check out')
    assert.equal(diaryCount.toNumber(), 1)
  })
})