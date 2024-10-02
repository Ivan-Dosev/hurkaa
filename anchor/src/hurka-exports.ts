// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import HurkaIDL from '../target/idl/hurka.json';
import type { Hurka } from '../target/types/hurka';

// Re-export the generated IDL and type
export { Hurka, HurkaIDL };

// The programId is imported from the program IDL.
export const HURKA_PROGRAM_ID = new PublicKey(HurkaIDL.address);

// This is a helper function to get the Hurka Anchor program.
export function getHurkaProgram(provider: AnchorProvider) {
  return new Program(HurkaIDL as Hurka, provider);
}

// This is a helper function to get the program ID for the Hurka program depending on the cluster.
export function getHurkaProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return HURKA_PROGRAM_ID;
  }
}
