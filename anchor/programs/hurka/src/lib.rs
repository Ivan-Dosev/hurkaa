#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("CY7sUHoeuQZEEvDxoYyRnWbw62zdn6ktqxZi1QNhbDfB");

#[program]
pub mod hurka {
    use super::*;
                 pub fn create_product_start(ctx: Context<CreateProduct> , key_group: Pubkey,
                                                                           key_sub_group: Pubkey,
                                                                           key_diameter: Pubkey, 
                                                                           key_length: Pubkey, 
                                                                           url: String,  ) -> Result<()> {
             
                        ctx.accounts.new_product.counts = 0;
                        ctx.accounts.new_product.price =  0;
                        ctx.accounts.new_product.sum = 0;
                        ctx.accounts.new_product.url = url;
                        
                        msg!("🟩 Createing Product. 🐸");
                        Ok(())
                        }
             
             pub fn buy_start(ctx: Context<CreateBuySell> , key_group: Pubkey,
                                                            key_sub_group: Pubkey,
                                                            key_diameter: Pubkey, 
                                                            key_length: Pubkey, 
                                                            counts: u8, sum: u8) -> Result<()> {
             
                    ctx.accounts.new_buy_sell.counts += counts;
                    ctx.accounts.new_buy_sell.sum    += sum;
                    ctx.accounts.new_buy_sell.price =    ctx.accounts.new_buy_sell.sum / ctx.accounts.new_buy_sell.counts ;
                    
                    msg!("🟩 Buy :  counts: {:?} | price: {:?} | sum: {:?}", counts, ( sum / counts ) , sum );
                    Ok(())
                    }
             
             pub fn sell_start(ctx: Context<CreateBuySell> , key_group: Pubkey,
                                                             key_sub_group: Pubkey,
                                                             key_diameter: Pubkey, 
                                                             key_length: Pubkey, 
                                                             counts: u8 ) -> Result<()> {
                      let sell_sum = counts * ctx.accounts.new_buy_sell.price;
                      
                      ctx.accounts.new_buy_sell.counts -= counts;
                      ctx.accounts.new_buy_sell.sum    -= sell_sum;
                      ctx.accounts.new_buy_sell.price =   ctx.accounts.new_buy_sell.sum / ctx.accounts.new_buy_sell.counts ;
                      
                      msg!("🟩 Sell:  {:?} |", counts );
                      Ok(())
                      }
             
             pub fn create_group_start(ctx: Context<CreateGroup> , name: String, publicKey: Pubkey) -> Result<()> {
             
                           ctx.accounts.new_group_account.name_group = name;
                           ctx.accounts.new_group_account.key_group = ctx.accounts.new_group_account.key();
                           ctx.accounts.new_group_account.wallet = publicKey;
                           
                           msg!("🟨 Creating Group name: {:?} ",   ctx.accounts.new_group_account.name_group );
                           Ok(())
                           }
             
             pub fn create_sub_group_start(ctx: Context<CreateSubGroup> , name: String, key_select_group: Pubkey,) -> Result<()> {
             
                          ctx.accounts.new_sub_group_account.name_sub_group = name; 
                          ctx.accounts.new_sub_group_account.key_sub_group = ctx.accounts.new_sub_group_account.key();
                          ctx.accounts.new_sub_group_account.key_select_group = key_select_group;
                          
                          msg!("🟨 Creating SubGroup name: {:?} ", ctx.accounts.new_sub_group_account.name_sub_group );
                          Ok(())
                          }
             
             pub fn create_diameter_start(ctx: Context<CreateDiameter> , str_diameter: String, key_select_sub_group: Pubkey,) -> Result<()> {
             
                           ctx.accounts.new_diameter_account.diameter = str_diameter;
                           ctx.accounts.new_diameter_account.key_diameter = ctx.accounts.new_diameter_account.key();
                           ctx.accounts.new_diameter_account.key_select_sub_group = key_select_sub_group;
                           
                           msg!("🟨 Creating diameter: {:?} ",   ctx.accounts.new_diameter_account.diameter);
                           Ok(())
                           }
             
             pub fn create_length_start(ctx: Context<CreateLength> , length: String, key_select_diameter: Pubkey ) -> Result<()> {
             
                           ctx.accounts.new_length_account.length = length;
                           ctx.accounts.new_length_account.key_length = ctx.accounts.new_length_account.key();
                           ctx.accounts.new_length_account.key_select_diameter  = key_select_diameter;
                
                           
                           msg!("🟨 Creating length: {:?} ", ctx.accounts.new_length_account.length);
                           Ok(())
                           }

}

#[derive(Accounts)]
#[instruction( key_group: Pubkey, key_sub_group: Pubkey, key_diameter: Pubkey, key_length: Pubkey)]
pub struct CreateProduct<'info> {

    #[account(
               init_if_needed,
               seeds = [key_group.as_ref(), key_sub_group.as_ref(), key_diameter.as_ref(), key_length.as_ref() ],
               bump,
               space = 8 + ProductAccount::INIT_SPACE,
               payer = signer,

    )]
    pub new_product: Account<'info, ProductAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,


}

#[derive(Accounts)]
#[instruction( key_group: Pubkey, key_sub_group: Pubkey, key_diameter: Pubkey, key_length: Pubkey)]
pub struct CreateBuySell<'info> {

    #[account(
               mut,
               seeds = [key_group.as_ref(), key_sub_group.as_ref(), key_diameter.as_ref(), key_length.as_ref() ],
               bump,
               realloc = 8 + ProductAccount::INIT_SPACE,
               realloc::payer = signer,
               realloc::zero = true,

    )]
    pub new_buy_sell: Account<'info, ProductAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,


}


#[derive(Accounts)]
pub struct CreateGroup<'info> {
    #[account(
        init,
        payer = signer, 
        space = 8 + GroupAccount::INIT_SPACE,
)]
pub new_group_account: Account<'info, GroupAccount>,

#[account(mut)]
pub signer: Signer<'info>,
pub system_program: Program<'info, System>,

}

#[derive(Accounts)]
pub struct CreateSubGroup<'info> {
    #[account(
        init,
        payer = signer, 
        space = 8 + SubGroupAccount::INIT_SPACE,
)]
pub new_sub_group_account: Account<'info, SubGroupAccount>,

#[account(mut)]
pub signer: Signer<'info>,
pub system_program: Program<'info, System>,

}


#[derive(Accounts)]
pub struct CreateDiameter<'info> {
    #[account(
        init,
        payer = signer, 
        space = 8 + DiameterAccount::INIT_SPACE,
)]
pub new_diameter_account: Account<'info, DiameterAccount>,

#[account(mut)]
pub signer: Signer<'info>,
pub system_program: Program<'info, System>,

}


#[derive(Accounts)]
pub struct CreateLength<'info> {
    #[account(
        init,
        payer = signer, 
        space = 8 + LengthAccount ::INIT_SPACE,
)]
pub new_length_account: Account<'info, LengthAccount >,

#[account(mut)]
pub signer: Signer<'info>,
pub system_program: Program<'info, System>,

}

#[account]
#[derive(InitSpace)]
pub struct GroupAccount {

    #[max_len(40)]
    name_group: String,
    #[max_len(50)]
    pub  key_group: Pubkey,
    #[max_len(50)]
    pub  wallet: Pubkey,
}

#[account]
#[derive(InitSpace)]
pub struct SubGroupAccount {

    #[max_len(40)]
    name_sub_group: String,
    #[max_len(50)]
    pub  key_sub_group: Pubkey,
    #[max_len(50)]
    pub  key_select_group: Pubkey,
}

#[account]
#[derive(InitSpace)]
pub struct DiameterAccount {

    #[max_len(30)]
    diameter: String,
    #[max_len(50)]
    pub  key_diameter: Pubkey,
    #[max_len(50)]
    pub  key_select_sub_group: Pubkey,
}

#[account]
#[derive(InitSpace)]
pub struct LengthAccount {

    #[max_len(30)]
    length: String,
    #[max_len(50)]
    pub  key_length: Pubkey,
    #[max_len(50)]
    pub  key_select_diameter: Pubkey,
}



#[account]
#[derive(InitSpace)]
pub struct ProductAccount {

     counts: u8,
      price: u8, 
        sum: u8, 
   #[max_len(100)]
        url: String,   

}