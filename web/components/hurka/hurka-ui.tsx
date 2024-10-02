'use client';

import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMemo , useState} from 'react';
import { ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useHurkaProgram, useHurkaProgramAccount } from './hurka-data-access';

import { Account } from '@solana/spl-token';
import { program } from '@coral-xyz/anchor/dist/cjs/native/system';
import { setTimeout } from 'timers';
import './ScrollableSelectableList.css';
import { BN } from '@coral-xyz/anchor'; 
import { useWallet } from '@solana/wallet-adapter-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { access } from 'fs';




export function HurkaList() {
 
  const { groups, 
          subgroups,
          diameters, 
          lengths,  
          products,
      
          getProgramAccount,
          programId,
          program,
      
          createGroup,
          createSubGroup, 
          createDiameter, 
          createLength,  
          createProduct,

  } = useHurkaProgram();

           // declare_id!("CY7sUHoeuQZEEvDxoYyRnWbw62zdn6ktqxZi1QNhbDfB");
const kay = new PublicKey("CY7sUHoeuQZEEvDxoYyRnWbw62zdn6ktqxZi1QNhbDfB"); // original comand dont work

const { publicKey} = useWallet();
const [viewAccount, SetViewAccount] = useState<PublicKey | null>( null );      


const [groupName, SetgroupName]  = useState(""); 
const  keyGroup    = Keypair.generate();
const [selectedGroup, SetselectedGroup] = useState<string | null>(null);
const [selectedGroupKey, SetselectedGroupKey] = useState<PublicKey | null>(null);
const isGroupValid = groupName.trim();
const handleGroup = (item: string) => { 
  SetselectedGroup(item);
  SetselectedSub("");
  SetSelectedDiameter("");
  SetSelectedLength("");
  SetselectedSubKey(null);
  SetSelectedDiameterKey(null);
  SetSelectedLengthKey(null);
  SetgroupName("");
};
const handleGroupKey = (key: PublicKey) => {
SetselectedGroupKey(key);


};
const handleNewGroup = () => {  
createGroup.mutateAsync( { groupName, keyGroup , publicKey})
SetgroupName("");

// SetGroupName("");
};



const [sabGroupName, SetsubgroupName]  = useState(""); 
const keySubGroup = Keypair.generate();
const [selectedSub, SetselectedSub] = useState<string | null>(null);
const [selectedSubKey, SetselectedSubKey] = useState<PublicKey | null>(null);
const isSubValid = sabGroupName.trim();
const handleSub = (item: string) => {
  SetselectedSub(item); 
  SetSelectedDiameter("");
  SetSelectedLength("");
  SetSelectedDiameterKey(null);
  SetSelectedLengthKey(null);
  SetDiameter("");
 
};
const handleSubKey = (key: PublicKey) => {
SetselectedSubKey(key);

};
const handleNewSub = () => {  
createSubGroup.mutateAsync( { sabGroupName, keySubGroup, selectedGroupKey }); 
SetsubgroupName("");
};




const [diameter, SetDiameter]  = useState(""); 
const keyDiameter = Keypair.generate();
const [selectedDiameter, SetSelectedDiameter] = useState<string | null>(null);
const [selectedDiameterKey, SetSelectedDiameterKey] = useState<PublicKey | null>(null);
const isDiameterValid = diameter.trim();
const handleDiameter = (item: string) => { 
  SetSelectedDiameter(item); 
  SetSelectedLength("");
  SetSelectedLengthKey(null);
 
};
const handleDiameterKey = (key: PublicKey) => {
SetSelectedDiameterKey(key);

};
const handleNewDiameter = () => {
createDiameter.mutateAsync({ diameter, keyDiameter, selectedSubKey});
SetDiameter("");

};







const [b4, SetB4] = useState<string | null>(null);
const [length, SetLength]  = useState(""); 
const keyLength = Keypair.generate();
const [selectedLength, SetSelectedLength] = useState<string | null>(null);
const [selectedLengthKey, SetSelectedLengthKey] = useState<PublicKey | null>(null);
const isLengthValid = length.trim();
const handleLength = (item: string) => {  SetSelectedLength(item); };
const handleLengthKey = (key: PublicKey) => {
  //SetViewPublicKey(null);
  SetSelectedLengthKey(key);
 

 // setToggle(false);
 // setTimeout(() => { handleView(); }, 1000);
             

};
const handleNewLength = () => {
createLength.mutateAsync({ length, keyLength, selectedDiameterKey});
SetLength("");
};

const [url, SetUrl] = useState("");
//const url = "https://bafybeifvzmxapabvtj3efeoff6q53xpxsulvwcrrcsd74afrmimt2ippz4.ipfs.w3s.link/ardatoken.jpg"
const handleNewProducts = () => {
createProduct.mutateAsync({ selectedGroupKey, selectedSubKey , selectedDiameterKey, selectedLengthKey , url});
SetUrl("");
};



const handle__PubKeyProducts = () => {


if (viewPublicKey) {
       setToggle(true);
       SetViewAccount(viewPublicKey);
}
};

const [isToggled, setToggle] = useState(false) ; 

const handlePubKeyProducts = () => {


  if (selectedGroupKey && selectedSubKey && selectedDiameterKey && selectedLengthKey) {
  const [productKey] = PublicKey.findProgramAddressSync(
        [
          selectedGroupKey.toBuffer(),
          selectedSubKey.toBuffer(),
          selectedDiameterKey.toBuffer(),
          selectedLengthKey.toBuffer()
        ],
        
        kay,
       );
                if(productKey) {
                         setToggle(true);
                         SetViewAccount(productKey);      
                }  
    }
  };


//   const { cluster } = useCluster();
//   
const [searchQueryGroup, setSearchQueryGroup] = useState('');
const handleEraseGroup = () => { setSearchQueryGroup(''); };
const [searchQuerySubGroup, setSearchQuerySubGroup] = useState('');
const handleEraseSubGroup = () => { setSearchQuerySubGroup(''); };
const [searchQueryDiameter, setSearchQueryDiameter] = useState('');
const handleEraseDiameter = () => { setSearchQueryDiameter(''); };
const [searchQueryLength, setSearchQueryLength] = useState('');
const handleEraseLength = () => { setSearchQueryLength(''); };

    
  


const [viewPublicKey, SetViewPublicKey] = useState<PublicKey | null>(null);
const isValidCreateProduct = selectedGroupKey?.toString().trim() && selectedSubKey?.toString().trim()  && selectedDiameterKey?.toString().trim() &&  selectedLengthKey?.toString().trim()
  


if (getProgramAccount.isLoading) {
return <span className="loading loading-spinner loading-lg"></span>;
}
if (!getProgramAccount.data?.value) {
return (
<div className="alert alert-info flex justify-center">
  <span>
    Program account not found. Make sure you have deployed the program and
    are on the correct cluster.
  </span>
 
</div>
);
}
return (


<div className={'space-y-6'}>
{groups.isLoading ? (
  <span className="loading loading-spinner loading-lg"></span>
) : (
<>





{ isToggled && (
    <div style={{ backgroundColor: 'blue', justifyContent: 'center' , alignItems: 'center', textAlign: 'center'}}>
       <CounterCard account={viewAccount} selectedGroupKey={selectedGroupKey} selectedSubKey={selectedSubKey} selectedDiameterKey={selectedDiameterKey} selectedLengthKey={selectedLengthKey} />
   </div>
)}


      


  <div className="flex space-x-4 p-4">


              <div  className="container">
              <input
                         type="text"
                         placeholder="Searching ..." 
                         value={searchQueryGroup}
                         onChange={e => setSearchQueryGroup(e.target.value)}
                         className="input input-bordered w-full "      
             />

              <div className="scrollable-list">
                <ul>
                  {groups
                    .data
                    .filter((bip) => bip.account? bip.account.wallet.toString() === publicKey?.toString() : null)
                    .sort((a, b) => a.account.nameGroup.localeCompare(b.account.nameGroup))
                    .filter((abc) => abc.account.nameGroup.toLowerCase().includes(searchQueryGroup.toLowerCase())) 
                    .map((item, index) => (
                    <li
                      key={index}
                      className={`list-item ${
                        selectedGroup === item.account.nameGroup ? 'selected' : ''
                      }`}
                      onClick={() => {
                        handleGroup(item.account.nameGroup);
                        handleGroupKey(item.account.keyGroup);
                       // handleGroupKey(item.publicKey)
                      }}
                    >
                      {item.account.nameGroup} 

                    </li>
                  ))}
                </ul>
              </div>
             
                <>
                <div  className="selected-item">
                    <input
                         type="text"
                         placeholder="Enter group one ..."
                         maxLength={40}
                         value={groupName}
                         onChange={e => SetgroupName(e.target.value)}
                         className="input input-bordered w-full max-w-xs"
                        
                       />
                           <button
                            className="btn btn-xs lg:btn-md btn-primary"
                             onClick={ handleNewGroup }
                             disabled={ createGroup.isPending || !isGroupValid}
                           >
                             Save group one
                           </button>
                    </div>

            
                </>

          
   </div>


   {selectedGroup && (
   <div  className="container">
    
              <input
                         type="text"
                         placeholder="Searching ..."
                         value={searchQuerySubGroup}
                         onChange={e => setSearchQuerySubGroup(e.target.value)}
                         className="input input-bordered w-full "      
             />

              <div className="scrollable-list">
                <ul>
                  {
                    subgroups
                    .data
                    .filter( (bip) => bip.account?  bip.account.keySelectGroup.toString() === selectedGroupKey?.toString() : null)
                    .sort((a, b) => a.account.nameSubGroup.localeCompare(b.account.nameSubGroup))
                    .filter((abc) => abc.account.nameSubGroup.toLowerCase().includes(searchQuerySubGroup.toLowerCase())) 
                    .map((item, index) => (
                                <li
                                key={item.publicKey.toString()}
                                className={`list-item ${
                                  selectedSub === item.account.nameSubGroup ? 'selected' : ''
                                }`}
                                onClick={() => {
                                  handleSub(item.account.nameSubGroup);
                                  handleSubKey(item.account.keySubGroup);
                             
                                }}
                              >
                                      {item.account.nameSubGroup}
                              </li>
                       ))}
                 </ul>
              </div>
              
             
                <>
                  <div  className="selected-item">
                        <input
                         type="text"
                         placeholder="Enter group two ..."
                         maxLength={40}
                         value={sabGroupName}
                         onChange={e => SetsubgroupName(e.target.value)}
                         className="input input-bordered w-full max-w-xs"
                        
                        />
                           <button
                            className="btn btn-xs lg:btn-md btn-primary "
                             onClick={ handleNewSub }
                             disabled={ createGroup.isPending || !isSubValid }
                           >
                            Save group two
                           </button>
                    </div>
                </>
            
            </div>

          )}


     {selectedSub && (
     <div  className="container">
              <input
                         type="text"
                         placeholder="Searching ..."
                         value={searchQueryDiameter}
                         onChange={e => setSearchQueryDiameter(e.target.value)}
                         className="input input-bordered w-full "      
             />

              <div className="scrollable-list">
                <ul>
                  {
                    diameters
                    .data
                    .filter( (diam) => diam.account?  diam.account.keySelectSubGroup.toString() === selectedSubKey?.toString() : null)
                    .sort((a, b) => a.account.diameter.localeCompare(b.account.diameter))
                    .filter((abc) => abc.account.diameter.toLowerCase().includes(searchQueryDiameter.toLowerCase())) 
                    .map((item, index) => (
                                <li
                                key={index}
                                className={`list-item ${
                                  selectedDiameter === item.account.diameter ? 'selected' : ''
                                }`}
                                onClick={() => {
                                  handleDiameter(item.account.diameter);
                                  handleDiameterKey (item.account.keyDiameter);
                             
                                }}
                              >
                                      {item.account.diameter}
                              </li>
                       ))}
                 </ul>
              </div>
             
                <>
                  <div  className="selected-item">
                        <input
                         type="text"
                         placeholder="Enter group tree ..."
                         maxLength={30}
                         value={diameter}
                         onChange={e => SetDiameter(e.target.value)}
                         className="input input-bordered w-full max-w-xs"
                        
                        />
                           <button
                            className="btn btn-xs lg:btn-md btn-primary "
                             onClick={ handleNewDiameter }
                             disabled={ createDiameter.isPending || !isDiameterValid}
                           >
                             Save group tree
                           </button>
                    </div>
                </>
             
            </div>
      )}




{selectedDiameter && (
     <div  className="container">
              <input
                         type="text"
                         placeholder="Searching ..."
                         value={searchQueryLength}
                         onChange={e => setSearchQueryLength(e.target.value)}
                         className="input input-bordered w-full "      
             />

              <div className="scrollable-list">
                <ul>
                  {
                    lengths
                    .data
                    .filter( (diam) => diam.account?  diam.account.keySelectDiameter.toString() === selectedDiameterKey?.toString(): null)
                    .sort((a, b) => a.account.length.localeCompare(b.account.length))
                    .filter((abc) => abc.account.length.toLowerCase().includes(searchQueryLength.toLowerCase())) 
                    .map((item, index) => (
                                <li
                                key={index}
                                className={`list-item ${
                                  selectedLength === item.account.length ? 'selected' : ''
                                }`}
                                onClick={() => {
                                  handleLength(item.account.length);
                                  handleLengthKey (item.account.keyLength);
                                }}
                              >
                                      {item.account.length}
                              </li>
                       ))}
                 </ul>
              </div>
             
                <>
                  <div  className="selected-item">
                        <input
                         type="text"
                         placeholder="Enter group four ..."
                         maxLength={30}
                         value={length}
                         onChange={e => SetLength(e.target.value)}
                         className="input input-bordered w-full max-w-xs"
                        
                        />
                           <button
                            className="btn btn-xs lg:btn-md btn-primary "
                             onClick={ handleNewLength }
                             disabled={ createLength.isPending || !isLengthValid}
                           >
                             Save group four
                           </button>
                    </div>
                </>
             
            </div>
          )}


 <div  className="container">

 <h1 style={{ color: 'black' }}>_</h1>
 <h1 style={{ color: 'black' }}>_</h1>
   <div className="scrollable-list">
   
       <div className="mara">
              { 1 && (
                            <>
                            <button
                             className="btn btn-xs lg:btn-md btn-primary "
                              onClick={  handlePubKeyProducts }
                              disabled={ createProduct.isPending  ||  !isValidCreateProduct}
                            >
                              view 
                            </button>
                          {url.trim() && (<p> <img  className="photo" src={url} alt="....." /> </p>)} 
                        </>
              )}

        </div>
   </div>
   { 1 && (
   <div  className="selected-item">
       <div className="mara">

              <>
                <input
                         type="text"
                         placeholder="Image  ..."
                         value={url}
                         onChange={e => SetUrl(e.target.value)}
                         onPaste={e => e.clipboardData.getData('text')}

                         className="input input-bordered w-full max-w-xs"
                        
                />

                <button
                   className="btn btn-xs lg:btn-md btn-primary "
                    onClick={ handleNewProducts }
                    disabled={ createProduct.isPending  ||  !isValidCreateProduct}
                  >
                    Create Product
                  </button>       
                </>
        </div>
      </div>
   )}


</div>
</div>
</>




)}
</div>
);


}

function CounterCard({ account , selectedGroupKey, selectedSubKey , selectedDiameterKey, selectedLengthKey }: { account: PublicKey , selectedGroupKey: PublicKey, selectedSubKey: PublicKey, selectedDiameterKey: PublicKey, selectedLengthKey: PublicKey }) {
  const {
    productQuery,
    buyProduct,
    cellProduct,

  } = useHurkaProgramAccount({ account });

  const count = useMemo(
    () => productQuery.data?.counts ?? -1,
    [productQuery.data?.counts]
  );


  const price = useMemo(
    () => productQuery.data?.price ?? -1,
    [productQuery.data?.price]
  );

  const sum = useMemo(
    () => productQuery.data?.sum ?? -1,
    [productQuery.data?.sum]
  );

  const url = useMemo(
    () => productQuery.data?.url ?? "",
    [productQuery.data?.url]
  );
  const isNotAccount = (count === -1 && price === -1 && sum === -1);

  const handleBuyProducts = () => {

      buyProduct.mutateAsync({ selectedGroupKey, selectedSubKey , selectedDiameterKey, selectedLengthKey })
    };
  
  
    const handleCellProducts = () => {
  
     cellProduct.mutateAsync({ selectedGroupKey, selectedSubKey , selectedDiameterKey, selectedLengthKey })
    };

  return  productQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : ( isNotAccount ? (<h2>The account does not exist. Press button Create Product.</h2>) : 
         (


                     <div className="grid-container">
                      
                     <div className="column1">
                     
                       <p> <img  className="photo" src={url} alt="....." /> </p>
                     </div>
                     <div className="column2">
                       <div className="row1">

                       <h2 className="point">{"amount: "}{ count.toFixed(2)} {"pcs. -  price: "} {price.toFixed(2)} {"$ - sum: "} {sum.toFixed(2)} {"$"} </h2>
                       </div>
                       <div className="row2">
                         <p>
                         <h2 className='marabutton'>
                                  <button
                                  
                                    className="btn btn-xs lg:btn-md btn-primary "
                                     onClick={ handleCellProducts }
                                 
                                   >
                                     sell 1 psc
                                   </button>
          
                                   <button
                                  
                                    className="btn btn-xs lg:btn-md btn-primary "
                                     onClick={ handleBuyProducts }
                                  
                                   >
                                     buy 1 psc
                                   </button>
                         </h2>
                         </p>
                       </div>
                     </div>
                   </div>
         )  

  );
}

