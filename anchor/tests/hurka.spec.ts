import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Hurka } from '../target/types/hurka';

describe('hurka', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Hurka as Program<Hurka>;

  const hurkaKeypair = Keypair.generate();

  it('Initialize Hurka', async () => {
    await program.methods
      .initialize()
      .accounts({
        hurka: hurkaKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([hurkaKeypair])
      .rpc();

    const currentCount = await program.account.hurka.fetch(
      hurkaKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Hurka', async () => {
    await program.methods
      .increment()
      .accounts({ hurka: hurkaKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.hurka.fetch(
      hurkaKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Hurka Again', async () => {
    await program.methods
      .increment()
      .accounts({ hurka: hurkaKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.hurka.fetch(
      hurkaKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement Hurka', async () => {
    await program.methods
      .decrement()
      .accounts({ hurka: hurkaKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.hurka.fetch(
      hurkaKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set hurka value', async () => {
    await program.methods
      .set(42)
      .accounts({ hurka: hurkaKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.hurka.fetch(
      hurkaKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the hurka account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        hurka: hurkaKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.hurka.fetchNullable(
      hurkaKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
