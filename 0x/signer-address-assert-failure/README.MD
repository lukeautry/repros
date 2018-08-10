# The bug

I noticed when testing against Kovan, I couldn't sign messages using the private key subprovider when using web3-wrapper. I'd see the following assertion error triggered from web3-wrapper:

```
Specified signerAddress <PUBLIC_ADDRESS> isn't available through the supplied web3 provider at Object.assert 
```

This assertion fails if the signer addresses used isn't returned in the array from Web3Wrapper.getAvailableAddressesAsync. Interestingly, the address *was* returned when calling getAccounts on the private key subprovider directly.

Didn't dig too much into this as I have a decent workaround, but I think something additional needs to happen in getAvailableAddressesAsync to make sure that all subproviders are checked when applicable.

## Why this just now surfaced

Probably because ganache already has the accounts unlocked on the RPC server so this check would always pass in you guys' tests. Our tests using Ganache worked great for this case, but it fell down once testing started on Kovan.

# Workarounds

If you add the private key subprovider before your RPC subprovider, it works ¯\_(ツ)_/¯

# Repro
- Clone this repo
- cd 0x/signer-address-assert-failure
- yarn
- yarn start