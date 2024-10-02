'use client';

import { getHurkaProgram, getHurkaProgramId } from '@hurka/anchor';
import { BN, Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import { Account } from '@solana/spl-token';

interface GroupArgs {
  groupName: string, 
  keyGroup:   Keypair,
  publicKey: PublicKey,

}
interface SubGroupArgs {
sabGroupName:   string, 
keySubGroup: Keypair,
selectedGroupKey: PublicKey,
}

interface DiameterArgs {
diameter:    string, 
keyDiameter: Keypair,
selectedSubKey: PublicKey,
}
  
interface LengthArgs {
length:     string, 
keyLength:  Keypair,
selectedDiameterKey: PublicKey,
}

interface ProductArgs {
selectedGroupKey: PublicKey,
selectedSubKey: PublicKey,
selectedDiameterKey: PublicKey,
selectedLengthKey: PublicKey,
url: String,
}

interface AddArgs {
selectedGroupKey: PublicKey,
selectedSubKey: PublicKey,
selectedDiameterKey: PublicKey,
selectedLengthKey: PublicKey,
}

export function useHurkaProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getHurkaProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getHurkaProgram(provider)

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });


  const groups = useQuery({
    queryKey: ['group', 'all', { cluster }],
    queryFn: () => program.account.groupAccount.all(),
  });

  const subgroups = useQuery({
    queryKey: ['subgroup', 'all', { cluster }],
    queryFn: () => program.account.subGroupAccount.all(),
  });


  const diameters = useQuery({
    queryKey: ['diameters', 'all', { cluster }],
    queryFn: () => program.account.diameterAccount.all(),
  });
 


  const  lengths = useQuery({
    queryKey: ['lengths', 'all', { cluster }],
    queryFn: () => program.account.lengthAccount.all(),
  });

  
 
  const  products = useQuery({
    queryKey: ['products', 'all', { cluster }],
    queryFn: () => program.account.productAccount.all(),
  });

  const createGroup = useMutation<string, Error, GroupArgs>({
    mutationKey: ['counter', 'create', { cluster }],
    mutationFn:  ( { groupName, keyGroup , publicKey}) =>
      program.methods
        .createGroupStart(groupName, publicKey)
        .accounts({ newGroupAccount: keyGroup.publicKey })
        .signers([keyGroup])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return groups.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });


  const createSubGroup = useMutation<string, Error, SubGroupArgs>({
    mutationKey: ['counter', 'create', { cluster }],
    mutationFn:  ( { sabGroupName, keySubGroup , selectedGroupKey}) =>
      program.methods
        .createSubGroupStart(sabGroupName, selectedGroupKey)
        .accounts({ newSubGroupAccount: keySubGroup.publicKey })
        .signers([keySubGroup])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return subgroups.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });



  const createDiameter = useMutation<string, Error, DiameterArgs>({
    mutationKey: ['counter', 'create', { cluster }],
    mutationFn:  ( { diameter, keyDiameter , selectedSubKey}) =>
      program.methods
        .createDiameterStart(diameter, selectedSubKey)
        .accounts({ newDiameterAccount: keyDiameter.publicKey })
        .signers([keyDiameter])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return diameters.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });



  const createLength = useMutation<string, Error, LengthArgs>({
    mutationKey: ['counter', 'create', { cluster }],
    mutationFn:  ( { length, keyLength , selectedDiameterKey}) =>
      program.methods
        .createLengthStart(length, selectedDiameterKey)
        .accounts({ newLengthAccount: keyLength.publicKey })
        .signers([keyLength])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return lengths.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });




  const createProduct = useMutation<string, Error, ProductArgs>({
    mutationKey: ['counter', 'create', { cluster }],
    mutationFn:  ( { selectedGroupKey, selectedSubKey , selectedDiameterKey, selectedLengthKey , url }) => {
    const [productPublicKey] =  PublicKey.findProgramAddressSync(
          [ selectedGroupKey.toBuffer(), selectedSubKey.toBuffer(), selectedDiameterKey.toBuffer(), selectedLengthKey.toBuffer()],
          programId );
      
          return program.methods
                   .createProductStart(selectedGroupKey, selectedSubKey, selectedDiameterKey, selectedLengthKey, url)
                   .accounts( productPublicKey )
                   .rpc();         
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return products.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });




  return {
    program,
    programId,
    groups,
    subgroups,
    diameters,
    lengths,
    products,
    getProgramAccount,
    createGroup,
    createSubGroup,
    createDiameter,
    createLength,
    createProduct,
  
  };
}

export function useHurkaProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();

  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getHurkaProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getHurkaProgram(provider);


  const productQuery = useQuery({
    queryKey: ['product', 'fetch', { cluster, account }],
    queryFn: () => program.account.productAccount.fetch(account),
  });


  const buyProduct = useMutation<string, Error, AddArgs>({
    mutationKey: ['counter', 'create', { cluster }],
    mutationFn:  ( { selectedGroupKey, selectedSubKey , selectedDiameterKey, selectedLengthKey , }) => {
    const [productPublicKey] =  PublicKey.findProgramAddressSync(
          [ selectedGroupKey.toBuffer(), selectedSubKey.toBuffer(), selectedDiameterKey.toBuffer(), selectedLengthKey.toBuffer()],
          programId );

          return program.methods
                   .buyStart(selectedGroupKey, selectedSubKey, selectedDiameterKey, selectedLengthKey, new BN(1), new BN(10))
                   .accounts( productPublicKey )
                   .rpc();         
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return productQuery.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });


  const cellProduct = useMutation<string, Error, AddArgs>({
    mutationKey: ['counter', 'create', { cluster }],
    mutationFn:  ( { selectedGroupKey, selectedSubKey , selectedDiameterKey, selectedLengthKey , }) => {
    const [productPublicKey] =  PublicKey.findProgramAddressSync(
          [ selectedGroupKey.toBuffer(), selectedSubKey.toBuffer(), selectedDiameterKey.toBuffer(), selectedLengthKey.toBuffer()],
          programId );

          return program.methods
                   .sellStart(selectedGroupKey, selectedSubKey, selectedDiameterKey, selectedLengthKey, new BN(1))
                   .accounts( productPublicKey )
                   .rpc();         
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return productQuery.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });



  return {
    productQuery,
    cellProduct,
    buyProduct,
  };
}
