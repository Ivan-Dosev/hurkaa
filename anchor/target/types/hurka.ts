/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/hurka.json`.
 */
export type Hurka = {
  "address": "CY7sUHoeuQZEEvDxoYyRnWbw62zdn6ktqxZi1QNhbDfB",
  "metadata": {
    "name": "hurka",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "buyStart",
      "discriminator": [
        178,
        111,
        250,
        126,
        16,
        92,
        219,
        192
      ],
      "accounts": [
        {
          "name": "newBuySell",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "keyGroup"
              },
              {
                "kind": "arg",
                "path": "keySubGroup"
              },
              {
                "kind": "arg",
                "path": "keyDiameter"
              },
              {
                "kind": "arg",
                "path": "keyLength"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "keyGroup",
          "type": "pubkey"
        },
        {
          "name": "keySubGroup",
          "type": "pubkey"
        },
        {
          "name": "keyDiameter",
          "type": "pubkey"
        },
        {
          "name": "keyLength",
          "type": "pubkey"
        },
        {
          "name": "counts",
          "type": "u8"
        },
        {
          "name": "sum",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createDiameterStart",
      "discriminator": [
        174,
        187,
        14,
        45,
        249,
        201,
        80,
        72
      ],
      "accounts": [
        {
          "name": "newDiameterAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "strDiameter",
          "type": "string"
        },
        {
          "name": "keySelectSubGroup",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "createGroupStart",
      "discriminator": [
        161,
        100,
        107,
        28,
        1,
        132,
        34,
        134
      ],
      "accounts": [
        {
          "name": "newGroupAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "publicKey",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "createLengthStart",
      "discriminator": [
        181,
        216,
        162,
        239,
        38,
        54,
        128,
        189
      ],
      "accounts": [
        {
          "name": "newLengthAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "length",
          "type": "string"
        },
        {
          "name": "keySelectDiameter",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "createProductStart",
      "discriminator": [
        128,
        111,
        61,
        237,
        48,
        21,
        100,
        22
      ],
      "accounts": [
        {
          "name": "newProduct",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "keyGroup"
              },
              {
                "kind": "arg",
                "path": "keySubGroup"
              },
              {
                "kind": "arg",
                "path": "keyDiameter"
              },
              {
                "kind": "arg",
                "path": "keyLength"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "keyGroup",
          "type": "pubkey"
        },
        {
          "name": "keySubGroup",
          "type": "pubkey"
        },
        {
          "name": "keyDiameter",
          "type": "pubkey"
        },
        {
          "name": "keyLength",
          "type": "pubkey"
        },
        {
          "name": "url",
          "type": "string"
        }
      ]
    },
    {
      "name": "createSubGroupStart",
      "discriminator": [
        70,
        47,
        108,
        208,
        66,
        49,
        126,
        212
      ],
      "accounts": [
        {
          "name": "newSubGroupAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "keySelectGroup",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "sellStart",
      "discriminator": [
        22,
        8,
        187,
        28,
        237,
        162,
        27,
        159
      ],
      "accounts": [
        {
          "name": "newBuySell",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "keyGroup"
              },
              {
                "kind": "arg",
                "path": "keySubGroup"
              },
              {
                "kind": "arg",
                "path": "keyDiameter"
              },
              {
                "kind": "arg",
                "path": "keyLength"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "keyGroup",
          "type": "pubkey"
        },
        {
          "name": "keySubGroup",
          "type": "pubkey"
        },
        {
          "name": "keyDiameter",
          "type": "pubkey"
        },
        {
          "name": "keyLength",
          "type": "pubkey"
        },
        {
          "name": "counts",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "diameterAccount",
      "discriminator": [
        241,
        156,
        26,
        102,
        61,
        151,
        133,
        194
      ]
    },
    {
      "name": "groupAccount",
      "discriminator": [
        12,
        42,
        207,
        53,
        238,
        29,
        151,
        111
      ]
    },
    {
      "name": "lengthAccount",
      "discriminator": [
        12,
        13,
        195,
        52,
        221,
        5,
        89,
        183
      ]
    },
    {
      "name": "productAccount",
      "discriminator": [
        244,
        140,
        143,
        108,
        240,
        97,
        155,
        231
      ]
    },
    {
      "name": "subGroupAccount",
      "discriminator": [
        181,
        87,
        129,
        225,
        130,
        129,
        40,
        153
      ]
    }
  ],
  "types": [
    {
      "name": "diameterAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "diameter",
            "type": "string"
          },
          {
            "name": "keyDiameter",
            "type": "pubkey"
          },
          {
            "name": "keySelectSubGroup",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "groupAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nameGroup",
            "type": "string"
          },
          {
            "name": "keyGroup",
            "type": "pubkey"
          },
          {
            "name": "wallet",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "lengthAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "length",
            "type": "string"
          },
          {
            "name": "keyLength",
            "type": "pubkey"
          },
          {
            "name": "keySelectDiameter",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "productAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "counts",
            "type": "u8"
          },
          {
            "name": "price",
            "type": "u8"
          },
          {
            "name": "sum",
            "type": "u8"
          },
          {
            "name": "url",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "subGroupAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nameSubGroup",
            "type": "string"
          },
          {
            "name": "keySubGroup",
            "type": "pubkey"
          },
          {
            "name": "keySelectGroup",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
