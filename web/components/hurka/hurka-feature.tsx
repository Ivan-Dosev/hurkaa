'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useHurkaProgram } from './hurka-data-access';
import { HurkaList } from './hurka-ui';

export default function HurkaFeature() {
  const { publicKey } = useWallet();
  const { programId } = useHurkaProgram();

  return publicKey ? (
    <div>
      <AppHero 
        title="SKLAD"
        subtitle={
          ''
        }
      >
      </AppHero>
      <HurkaList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
