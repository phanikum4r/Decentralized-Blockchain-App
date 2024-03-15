//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6;
contract Mytoken {
    struct person{

address add;
uint64 mobile;
bool reg;
uint8 l_id;
mapping(uint8=>bool) allids;
    }

mapping(address=>person) allpersons;
struct register{
       uint64 mobile;
       address add;
       string link;
       bool status;
       bool status_f;
}
 
mapping( address=> register) registered;
struct available_drops{
address payable userid;
address payable autoid;
string source;
string dest;
uint8 amount_paid;
bool dropped;
uint8 id;
uint otp_of_user;
    }
    uint8 lastid;
    mapping(uint8=>available_drops) drops_available;
    function send_amount(address payable receiver) public payable {
        uint amount=msg.value;
    receiver.transfer(amount);  
  } 
   function signup_as_vehicle_owner(string memory link ,uint64 mob,address veh_add)public{
registered[msg.sender].add=veh_add;
registered[msg.sender].link=link;
registered[msg.sender].status=true;
registered[msg.sender].mobile=mob;
registered[msg.sender].status_f=true;
   }  
    function signup_as_user(uint64 mob,address cust_add)public{
allpersons[msg.sender].add=cust_add;
allpersons[msg.sender].reg=true;
allpersons[msg.sender].mobile=mob;
   }   
   function generate_otp_for_drop() public view returns (uint){
return uint(keccak256(abi.encodePacked(now,msg.sender,lastid)))%100;
   }
   function is_reg_veh(address add) public view returns(bool){
return registered[add].status;

   }
   function drop_accepted(uint8 dr_id) public{
       drops_available[dr_id].dropped=true;
   }
   function getAcceptedDriverId(uint8 id) public view returns(address){
       return drops_available[id].autoid;
   }
   function add_drop(string memory source,string memory dest) public{
lastid+=1;
drops_available[lastid].id=lastid;
drops_available[lastid].userid=msg.sender;
drops_available[lastid].source=source;
drops_available[lastid].dest=dest;
drops_available[lastid].otp_of_user=generate_otp_for_drop();
allpersons[msg.sender].allids[lastid]=false;
allpersons[msg.sender].l_id=lastid;
   }

function picked_up(uint8 id, uint otp,uint8 amount,address payable veh_add ) public returns(bool)
{
uint otpreq=drops_available[id].otp_of_user;
if(otpreq!=otp){
return false;
}
drops_available[id].autoid=veh_add;
drops_available[id].amount_paid=amount;
drops_available[id].dropped=true;
send_amount(drops_available[id].userid);
allpersons[msg.sender].allids[id]=true;
return true;
}
function get_license_of_driver(uint8 id) public view returns(string memory){
    return  registered[drops_available[id].autoid].link;
}
function all_unpicked_drops() public  view returns(uint8[] memory ){
uint8[] memory allids=new uint8[](10);
uint8 z=0;
uint8 i=0;
for(i=1;i<=lastid;i++){
    if(drops_available[i].dropped==false){
if(z<10){
        allids[z]=i;
        z=z+1;}
        else{
            break;
        }

    }
}
return allids;
}
function getCustAddressById(uint8 id) public view returns(address){
     return drops_available[id].userid;
}
function getSourceById(uint8 id) public view returns(string memory){
    return drops_available[id].source;
}
function getDestinationById(uint8 id) public view returns(string memory){
    return drops_available[id].dest;
} 
function getAccountId() public view returns(address){
    return msg.sender;
}
function getotp(uint8 id) public view returns(uint){
    return drops_available[id].otp_of_user;
}
function getVehicle_id(uint8 id) public view returns(address){
    return drops_available[id].autoid;
}
function get_amount_to_be_paid(uint8 id) public view returns(uint8){
     return drops_available[id].amount_paid;
}
function get_drop_status(uint8 id )public view returns(bool){
    return drops_available[id].dropped;
}
function get_last_id(address add) public view returns(uint8){
    return allpersons[add].l_id;
}
function get_mob_of_cust(address add) public view returns(uint64){
    return allpersons[add].mobile;
}
function get_number_of_driver(address add) public view returns(uint64){
    return registered[add].mobile;
}
function isDropped(uint8 id) public view returns(bool){
    return drops_available[id].dropped;
}
function is_driver_free(address add) public view returns(bool){
    return registered[add].status_f;
}
function is_reg_cust(address add) public view returns(bool){
    return allpersons[add].reg;
}
}