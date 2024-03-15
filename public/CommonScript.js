document.writeln(
  '<script src="node_modules/web3/dist/web3.min.js"  type="text/jsx"></script>'
);

document.writeln(
  '<script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.36/dist/web3.min.js" ></script>'
);
document.writeln(
  '<script src="http://code.jquery.com/jquery-3.3.1.slim.min.js"></script>'
);
async function loadContract() {
  const ABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "source",
          type: "string",
        },
        {
          internalType: "string",
          name: "dest",
          type: "string",
        },
      ],
      name: "add_drop",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "dr_id",
          type: "uint8",
        },
      ],
      name: "drop_accepted",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "otp",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "amount",
          type: "uint8",
        },
        {
          internalType: "address payable",
          name: "veh_add",
          type: "address",
        },
      ],
      name: "picked_up",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "receiver",
          type: "address",
        },
      ],
      name: "send_amount",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "mob",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "cust_add",
          type: "address",
        },
      ],
      name: "signup_as_user",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "link",
          type: "string",
        },
        {
          internalType: "uint64",
          name: "mob",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "veh_add",
          type: "address",
        },
      ],
      name: "signup_as_vehicle_owner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "all_unpicked_drops",
      outputs: [
        {
          internalType: "uint8[]",
          name: "",
          type: "uint8[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "generate_otp_for_drop",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "get_amount_to_be_paid",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "get_drop_status",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "add",
          type: "address",
        },
      ],
      name: "get_last_id",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "get_license_of_driver",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "add",
          type: "address",
        },
      ],
      name: "get_mob_of_cust",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "add",
          type: "address",
        },
      ],
      name: "get_number_of_driver",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "getAcceptedDriverId",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAccountId",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "getCustAddressById",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "getDestinationById",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "getotp",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "getSourceById",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "getVehicle_id",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "add",
          type: "address",
        },
      ],
      name: "is_driver_free",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "add",
          type: "address",
        },
      ],
      name: "is_reg_cust",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "add",
          type: "address",
        },
      ],
      name: "is_reg_veh",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "id",
          type: "uint8",
        },
      ],
      name: "isDropped",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const contractAddress = "0xeA18a6C0Fe4F149d61f35F709E4D506833aAea9e";
  return await new window.web3.eth.Contract(ABI, contractAddress);
}

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}
async function getCurrentAccount(id) {
  const accounts = await window.web3.eth.getAccounts();
  if (id == 1) return accounts[0];
  else return "0x19E260Bfec457e96A96B91F4d6b8b31BB28Dd624";
}
async function load() {
  await loadWeb3();
  window.contract = await loadContract();
  updateStatus("Ready!");

  const acc = await getCurrentAccount(1);
  const ans1 = await is_reg_custm(acc);
  if (ans1 == false) {
    document.write(
      "<html><body id='bd' ><center><h2>Please register as Customer</h2></center></body></html>"
    );
    style = 'background-image: url("bg2.jpg");';
    document.getElementById("bd").style.backgroundImage = "url(bg2.jpg)";
    return;
  }
  var obj = document.getElementById("accId");
  const acc1 = await getCurrentAccount(0);
  obj.innerHTML = acc1;
  var x = document.getElementById("submit");

  x.style.display = "none";
}
async function is_reg_custm(acc) {
  var ans = await await window.contract.methods.is_reg_cust(acc).call();
  return ans;
}
async function driverSignUpLoad() {
  await loadWeb3();
  window.contract = await loadContract();
  const acc = await getCurrentAccount(1);
  var obj = document.getElementById("accId");
  obj.innerHTML = acc;
}
async function CustSignUpLoad() {
  await loadWeb3();
  window.contract = await loadContract();
  const acc = await getCurrentAccount(0);
  var obj = document.getElementById("accId");
  obj.innerHTML = acc;
}
async function uploadhash() {
  const account = await getCurrentAccount(1);
  var var1 = document.getElementById("hash").value;
  var mob = document.getElementById("mob").value;
  var1 = "https://azure-adequate-albatross-393.mypinata.cloud/ipfs/" + var1;
  const ans = await window.contract.methods
    .signup_as_vehicle_owner(var1, mob, account)
    .send({ from: account });
  document.write(
    "<html><body id='bd' ><center><h2>Uploading License is done</h2></center></body></html>"
  );
  style = 'background-image: url("bg2.jpg");';
  document.getElementById("bd").style.backgroundImage = "url(bg2.jpg)";
}

async function signupcust() {
  const account = await getCurrentAccount(1);

  var mob = document.getElementById("mob_num").value;

  const ans = await window.contract.methods
    .signup_as_user(mob, account)
    .send({ from: account });
  document.write(
    "<html><body id='bd' ><center><h2>Customer Registration Done</h2></center></body></html>"
  );
  style = 'background-image: url("bg2.jpg");';
  document.getElementById("bd").style.backgroundImage = "url(bg2.jpg)";
}

async function DriverSignInLoad() {
  await loadWeb3();
  window.contract = await loadContract();
  updateStatus("Ready!");
  const acc = await getCurrentAccount(1);
  console.log(acc);
  var obj = document.getElementById("accId");
  var regi_or_not = await getRegistered();
  console.log(regi_or_not);
  if (regi_or_not == false) {
    document.write(
      "<html><body id='bd' ><center><h2>Please register as Vehicle</h2></center></body></html>"
    );
    style = 'background-image: url("bg2.jpg");';
    document.getElementById("bd").style.backgroundImage = "url(bg2.jpg)";
    return;
  }
  obj.innerHTML = acc;
  const allUndropped = await getall_undropped();
  console.log(allUndropped);
  var arr_of_names = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eigth",
    "nineth",
    "tenth",
  ];
  for (var i = 0; i < 10; i++) {
    var obj = document.getElementById(arr_of_names[i] + "_inner");
    obj.style.display = "none";
  }
  for (var i = 0; i < 10; i++) {
    if (allUndropped[i] != "0") {
      var firstobj = document.getElementById(
        arr_of_names[i] + "_" + "bookedId"
      );
      firstobj.innerHTML = allUndropped[i];
      var sourceobj = document.getElementById(arr_of_names[i] + "_" + "source");
      sourceobj.innerHTML =
        "<label>Source&nbsp&nbsp</label>" +
        (await getSource(parseInt(allUndropped[i])));
      var desobj = document.getElementById(arr_of_names[i] + "_" + "dest");
      desobj.innerHTML =
        "<label>Dest &nbsp&nbsp&nbsp&nbsp&nbsp</label>" +
        (await getDestination(parseInt(allUndropped[i])));
      var mobobj = document.getElementById(arr_of_names[i] + "_" + "mob");
      mobobj.innerHTML =
        "<label>Mobile&nbsp&nbsp&nbsp</label>" +
        (await getMobile(parseInt(allUndropped[i])));
      var btobj = document.getElementById(arr_of_names[i] + "_inner");
      btobj.style.display = "block";
      btobj = document.getElementById(arr_of_names[i] + "_inner1");
      btobj.style.display = "none";
    } else {
      break;
    }
  }
}
async function getRegistered() {
  const acc = await getCurrentAccount(1);
  var ans = await window.contract.methods.is_reg_veh(acc).call();
  return ans;
}
async function bookDrop(a) {
  const stat = await getAccStatus();
  console.log("hello" + stat);
  if (stat == false || stat == "false") return;
  var ele = a.substring(0, a.length - 3);
  var btobj = document.getElementById(ele + "_inner1");
  btobj.style.display = "block";
  btobj = document.getElementById(ele + "_bt");
  btobj.style.display = "none";
  var ans = await drop_acc(ele);
}
async function drop_acc(ab) {
  var a = parseInt(document.getElementById(ab + "_bookedId").innerHTML);
  const account = await getCurrentAccount(1);
  console.log(account + " " + a + " " + ab);
  const ans = await window.contract.methods
    .drop_accepted(a)
    .send({ from: account });
}
async function getAccStatus() {
  const acc = await getCurrentAccount(1);
  const ans = await window.contract.methods.is_driver_free(acc).call();
  return ans;
}

function addPicked(ab) {
  var ele = ab.substring(0, ab.length - 7);
  console.log(ab);
  var a = parseInt(document.getElementById(ele + "_bookedId").innerHTML);
  var b = parseInt(document.getElementById(ele + "_otp").value);
  var c = parseInt(document.getElementById(ele + "_price").value);
  addPickUp(a, b, c);
}

function updateStatus(status) {
  const statusEl = document.getElementById("status");
  statusEl.innerHTML = status;
  console.log(status);
}
async function addPickUp(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
  var weival = c * 100;
  const account = await getCurrentAccount(1);
  const drop_id = await window.contract.methods
    .picked_up(a, b, c, account)
    .send({ from: account });
  if (drop_id == false) {
    alert("Invalid OTP or price entered");
  }
}
async function adddrop() {
  var a = document.getElementById("source").value;
  var b = document.getElementById("dest").value;
  const account = await getCurrentAccount(1);
  const drop_id = await window.contract.methods
    .add_drop(a, b)
    .send({ from: account });
  var drop_obj = document.getElementById("dropId");
  drop_obj.innerHTML = drop_id;
  updateStatus("Please click on Submit again");
  var x = document.getElementById("bt");

  x.style.display = "none";
  var x1 = document.getElementById("submit");

  x1.style.display = "block";
}
async function getlastId() {
  const ans = await window.contract.methods.get_last_id(account).call();

  var obj_id = document.getElementById("status");
  obj_id.innerHTML = ans;
}
async function getSource(ids) {
  const ans = await window.contract.methods.getSourceById(ids).call();

  return ans;
}
async function getMobile(ids) {
  const ans = await window.contract.methods.getCustAddressById(ids).call();
  const ans2 = await await window.contract.methods.get_mob_of_cust(ans).call();
  return ans2;
}
async function getDestination(ids) {
  const ans = await window.contract.methods.getDestinationById(ids).call();

  return ans;
}
async function getall_undropped() {
  const undropped = await window.contract.methods.all_unpicked_drops().call();
  return undropped;
}
