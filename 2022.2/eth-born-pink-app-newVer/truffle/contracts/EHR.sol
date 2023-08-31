pragma solidity >=0.4.22 <0.9.0;

contract EHR { 

  address public owner;

  constructor() {
  owner = msg.sender;
  }

  struct Record { 
    string cid;
    string fileName; 
    address blinkId;
    address managerId;
    uint256 timeAdded;
  }

  struct Blink {
    address id;
    Record[] records;
  }

  struct Manager {
    address id;
  }
`
  mapping (address => Blink) public blinks;
  mapping (address => Manager) public managers;

  event BlinkAdded(address blinkId);
  event ManagerAdded(address managerId);
  event RecordAdded(string cid, address blinkId, address managerId); 

  // modifiers

  modifier onlyOwner {
  require(msg.sender == owner, "Only the owner can call this function.");
  _;
  }

  modifier senderExists {
    require(managers[msg.sender].id == msg.sender || blinks[msg.sender].id == msg.sender, "Sender does not exist");
    _;
  }`

  modifier blinkExists(address blinkId) {
    require(blinks[blinkId].id == blinkId, "Blink does not exist");
    _;
  }

  modifier senderIsManager {
    require(managers[msg.sender].id == msg.sender, "Sender is not a manager");
    _;
  }

  // functions

  function addBlink(address _blinkId) public senderIsManager {
    require(blinks[_blinkId].id != _blinkId, "This blink already exists.");
    blinks[_blinkId].id = _blinkId;

    emit BlinkAdded(_blinkId);
  }

  function addManager() public onlyOwner {
    require(managers[msg.sender].id != msg.sender, "This manager already exists.");
    managers[msg.sender].id = msg.sender;

    emit ManagerAdded(msg.sender);
  }

  function addRecord(string memory _cid, string memory _fileName, address _blinkId) public senderIsManager blinkExists(_blinkId) {
    Record memory record = Record(_cid, _fileName, _blinkId, msg.sender, block.timestamp);
    blinks[_blinkId].records.push(record);

    emit RecordAdded(_cid, _blinkId, msg.sender);
  } 

  function getRecords(address _blinkId) public view senderExists blinkExists(_blinkId) returns (Record[] memory) {
    return blinks[_blinkId].records;
  } 

  function getSenderRole() public view returns (string memory) {
    if (managers[msg.sender].id == msg.sender) {
      return "manager";
    } else if (blinks[msg.sender].id == msg.sender) {
      return "blink";
    } else {
      return "unknown";
    }
  }

  function getBlinkExists(address _blinkId) public view senderIsManager returns (bool) {
    return blinks[_blinkId].id == _blinkId;
  }
} 