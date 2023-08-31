
pragma solidity ^0.5.0;

contract DiaryApp {
    uint public diaryCount = 0;

    struct Diary {
        uint id ;
        string content ;
    }

    constructor() public {
        createDiary("Check out");
    }

    mapping(uint => Diary) public diaries;

    function createDiary(string memory _content) public{
        diaryCount++;
        diaries[diaryCount] = Diary(diaryCount, _content);
    }

}