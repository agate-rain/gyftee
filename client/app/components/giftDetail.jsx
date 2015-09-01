var GiftDetail = React.createClass({

  render: function() {
    return (
      <div className="gift">
      <Book book={this.props.book}/>
      </div>
    );
  }
});

var Book = React.createClass({

  addToList: function() {
    console.log("add to list clicked for the item ", this.props.book[0].ItemAttributes.Title);
    // send the clicked book to the server to save on the user's gift list
    // should the req object just be Book's rendered view? this.props.book[0] 
  },

  render: function() {
    return (
      <div className="container gift-detail-container">
        <div>
          <div className="add-to-list"><a href="#" onClick={this.addToList}><i className="glyphicon glyphicon-heart"></i></a></div>
          <div className="book-thumbnail"><a href={this.props.book[0].DetailPageURL}><img src={this.props.book[0].MediumImage.URL} /></a></div>
        </div>
        
        <div className="book-title">{this.props.book[0].ItemAttributes.Title}</div>

        <div className="book-author">{this.props.book[0].ItemAttributes.Author}</div>
        <div className="book-binding">{this.props.book[0].ItemAttributes.Binding}</div>

        <div className="book-price">{this.props.book[0].Offers.Offer.OfferListing.Price.FormattedPrice}</div>
      </div>
      );
  }
});


var BOOK = [{
    "ASIN": "0312577222",
    "DetailPageURL": "http://www.amazon.com/The-Nightingale-Kristin-Hannah/dp/0312577222%3FSubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D0312577222",
    "ItemLinks": {
      "ItemLink": [
        {
          "Description": "Technical Details",
          "URL": "http://www.amazon.com/The-Nightingale-Kristin-Hannah/dp/tech-data/0312577222%3FSubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0312577222"
        },
        {
          "Description": "Add To Baby Registry",
          "URL": "http://www.amazon.com/gp/registry/baby/add-item.html%3Fasin.0%3D0312577222%26SubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0312577222"
        },
        {
          "Description": "Add To Wedding Registry",
          "URL": "http://www.amazon.com/gp/registry/wedding/add-item.html%3Fasin.0%3D0312577222%26SubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0312577222"
        },
        {
          "Description": "Add To Wishlist",
          "URL": "http://www.amazon.com/gp/registry/wishlist/add-item.html%3Fasin.0%3D0312577222%26SubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0312577222"
        },
        {
          "Description": "Tell A Friend",
          "URL": "http://www.amazon.com/gp/pdp/taf/0312577222%3FSubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0312577222"
        },
        {
          "Description": "All Customer Reviews",
          "URL": "http://www.amazon.com/review/product/0312577222%3FSubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0312577222"
        },
        {
          "Description": "All Offers",
          "URL": "http://www.amazon.com/gp/offer-listing/0312577222%3FSubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0312577222"
        }
      ]
    },
    "SmallImage": {
      "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL._SL75_.jpg",
      "Height": {
        "#": "75",
        "@": {
          "Units": "pixels"
        }
      },
      "Width": {
        "#": "49",
        "@": {
          "Units": "pixels"
        }
      }
    },
    "MediumImage": {
      "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL._SL160_.jpg",
      "Height": {
        "#": "160",
        "@": {
          "Units": "pixels"
        }
      },
      "Width": {
        "#": "105",
        "@": {
          "Units": "pixels"
        }
      }
    },
    "LargeImage": {
      "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL.jpg",
      "Height": {
        "#": "500",
        "@": {
          "Units": "pixels"
        }
      },
      "Width": {
        "#": "329",
        "@": {
          "Units": "pixels"
        }
      }
    },
    "ImageSets": {
      "ImageSet": [
        {
          "@": {
            "Category": "variant"
          },
          "SwatchImage": {
            "URL": "http://ecx.images-amazon.com/images/I/51px9gNrWNL._SL30_.jpg",
            "Height": {
              "#": "30",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "20",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "SmallImage": {
            "URL": "http://ecx.images-amazon.com/images/I/51px9gNrWNL._SL75_.jpg",
            "Height": {
              "#": "75",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "49",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "ThumbnailImage": {
            "URL": "http://ecx.images-amazon.com/images/I/51px9gNrWNL._SL75_.jpg",
            "Height": {
              "#": "75",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "49",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "TinyImage": {
            "URL": "http://ecx.images-amazon.com/images/I/51px9gNrWNL._SL110_.jpg",
            "Height": {
              "#": "110",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "72",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "MediumImage": {
            "URL": "http://ecx.images-amazon.com/images/I/51px9gNrWNL._SL160_.jpg",
            "Height": {
              "#": "160",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "105",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "LargeImage": {
            "URL": "http://ecx.images-amazon.com/images/I/51px9gNrWNL.jpg",
            "Height": {
              "#": "500",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "329",
              "@": {
                "Units": "pixels"
              }
            }
          }
        },
        {
          "@": {
            "Category": "variant"
          },
          "SwatchImage": {
            "URL": "http://ecx.images-amazon.com/images/I/31gKN%2BpNypL._SL30_.jpg",
            "Height": {
              "#": "30",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "22",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "SmallImage": {
            "URL": "http://ecx.images-amazon.com/images/I/31gKN%2BpNypL._SL75_.jpg",
            "Height": {
              "#": "75",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "56",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "ThumbnailImage": {
            "URL": "http://ecx.images-amazon.com/images/I/31gKN%2BpNypL._SL75_.jpg",
            "Height": {
              "#": "75",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "56",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "TinyImage": {
            "URL": "http://ecx.images-amazon.com/images/I/31gKN%2BpNypL._SL110_.jpg",
            "Height": {
              "#": "110",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "82",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "MediumImage": {
            "URL": "http://ecx.images-amazon.com/images/I/31gKN%2BpNypL._SL160_.jpg",
            "Height": {
              "#": "160",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "120",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "LargeImage": {
            "URL": "http://ecx.images-amazon.com/images/I/31gKN%2BpNypL.jpg",
            "Height": {
              "#": "500",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "375",
              "@": {
                "Units": "pixels"
              }
            }
          }
        },
        {
          "@": {
            "Category": "primary"
          },
          "SwatchImage": {
            "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL._SL30_.jpg",
            "Height": {
              "#": "30",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "20",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "SmallImage": {
            "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL._SL75_.jpg",
            "Height": {
              "#": "75",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "49",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "ThumbnailImage": {
            "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL._SL75_.jpg",
            "Height": {
              "#": "75",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "49",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "TinyImage": {
            "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL._SL110_.jpg",
            "Height": {
              "#": "110",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "72",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "MediumImage": {
            "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL._SL160_.jpg",
            "Height": {
              "#": "160",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "105",
              "@": {
                "Units": "pixels"
              }
            }
          },
          "LargeImage": {
            "URL": "http://ecx.images-amazon.com/images/I/515p3OrN1KL.jpg",
            "Height": {
              "#": "500",
              "@": {
                "Units": "pixels"
              }
            },
            "Width": {
              "#": "329",
              "@": {
                "Units": "pixels"
              }
            }
          }
        }
      ]
    },
    "ItemAttributes": {
      "Author": "Kristin Hannah",
      "Binding": "Hardcover",
      "Brand": "Hannah, Kristin",
      "CatalogNumberList": {
        "CatalogNumberListElement": "383262"
      },
      "EAN": "9780312577223",
      "EANList": {
        "EANListElement": "9780312577223"
      },
      "Edition": "First Edition",
      "ISBN": "0312577222",
      "IsEligibleForTradeIn": "1",
      "ItemDimensions": {
        "Height": {
          "#": "943",
          "@": {
            "Units": "hundredths-inches"
          }
        },
        "Length": {
          "#": "645",
          "@": {
            "Units": "hundredths-inches"
          }
        },
        "Weight": {
          "#": "120",
          "@": {
            "Units": "hundredths-pounds"
          }
        },
        "Width": {
          "#": "141",
          "@": {
            "Units": "hundredths-inches"
          }
        }
      },
      "Label": "St. Martin's Press",
      "Languages": {
        "Language": [
          {
            "Name": "English",
            "Type": "Published"
          },
          {
            "Name": "English",
            "Type": "Original Language"
          },
          {
            "Name": "English",
            "Type": "Unknown"
          }
        ]
      },
      "ListPrice": {
        "Amount": "2799",
        "CurrencyCode": "USD",
        "FormattedPrice": "$27.99"
      },
      "Manufacturer": "St. Martin's Press",
      "MPN": "383262",
      "NumberOfItems": "1",
      "NumberOfPages": "448",
      "PackageDimensions": {
        "Height": {
          "#": "150",
          "@": {
            "Units": "hundredths-inches"
          }
        },
        "Length": {
          "#": "930",
          "@": {
            "Units": "hundredths-inches"
          }
        },
        "Weight": {
          "#": "155",
          "@": {
            "Units": "hundredths-pounds"
          }
        },
        "Width": {
          "#": "620",
          "@": {
            "Units": "hundredths-inches"
          }
        }
      },
      "PartNumber": "383262",
      "ProductGroup": "Book",
      "ProductTypeName": "ABIS_BOOK",
      "PublicationDate": "2015-02-03",
      "Publisher": "St. Martin's Press",
      "ReleaseDate": "2015-02-03",
      "Studio": "St. Martin's Press",
      "Title": "The Nightingale",
      "TradeInValue": {
        "Amount": "384",
        "CurrencyCode": "USD",
        "FormattedPrice": "$3.84"
      }
    },
    "OfferSummary": {
      "LowestNewPrice": {
        "Amount": "1200",
        "CurrencyCode": "USD",
        "FormattedPrice": "$12.00"
      },
      "LowestUsedPrice": {
        "Amount": "1199",
        "CurrencyCode": "USD",
        "FormattedPrice": "$11.99"
      },
      "LowestCollectiblePrice": {
        "Amount": "3500",
        "CurrencyCode": "USD",
        "FormattedPrice": "$35.00"
      },
      "TotalNew": "63",
      "TotalUsed": "37",
      "TotalCollectible": "6",
      "TotalRefurbished": "0"
    },
    "Offers": {
      "TotalOffers": "1",
      "TotalOfferPages": "1",
      "MoreOffersUrl": "http://www.amazon.com/gp/offer-listing/0312577222%3FSubscriptionId%3DAKIAIXOK2UMOIUI6GEXQ%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0312577222",
      "Offer": {
        "OfferAttributes": {
          "Condition": "New"
        },
        "OfferListing": {
          "OfferListingId": "yeFcvN%2FGlYT%2BNzW0cmZ8Qkb4WDQfmMXRObYOaVaj%2FxXkmuR3qFb6ekJ8NyxLfm7PjTS6MfHfF3CpwGFhu28czBogCAe7cb2tmmR7kGkQhGPaNQp16wPonA%3D%3D",
          "Price": {
            "Amount": "1613",
            "CurrencyCode": "USD",
            "FormattedPrice": "$16.13"
          },
          "AmountSaved": {
            "Amount": "1186",
            "CurrencyCode": "USD",
            "FormattedPrice": "$11.86"
          },
          "PercentageSaved": "42",
          "Availability": "Usually ships in 24 hours",
          "AvailabilityAttributes": {
            "AvailabilityType": "now",
            "MinimumHours": "0",
            "MaximumHours": "0"
          },
          "IsEligibleForSuperSaverShipping": "1",
          "IsEligibleForPrime": "1"
        }
      }
    }
  }];


React.render(<GiftDetail book={BOOK}/>, document.getElementById('gift-detail'));
