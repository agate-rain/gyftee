
var UserHeader = React.createClass({

  render: function(){
    console.log(this.props.user);
    return (
      <div className="friend-info">
        <img className="friend-img" src={this.props.user.photo} />
        <div className="friend-name">{this.props.user.name}</div>
        <div className="friend-bday">{this.props.user.birthday}</div>
      </div>
      );
  }

});

var RecommendationFilters = React.createClass({

  render: function(){
    return (
      <div className="filters">
        <input type="text" placeholder="Filter" />
      </div>
      );
  }


});

var BooksList = React.createClass({

  render: function(){
    var books = [];
    this.props.data.forEach(function(book){
      books.push(<Book book={book} key={book.ASIN}/>);
    });

    return (
      <table className="books-list"> {books} </table>
    );
  }

});

var Book = React.createClass({

  render: function(){
    return (
      <tr className="book-info">
        
        <td className="book-img"><img src={this.props.book.SmallImage.URL}/></td>
        <td className="book-author">{this.props.book.ItemAttributes.Auther}</td>
        <td className="book-manufacturer">{this.props.book.ItemAttributes.Manufacturer}</td>
        <td className="book-title">{this.props.book.ItemAttributes.Title}</td>
      </tr>
      );
  }
});


var GiftRecommendations = React.createClass({
	render: function(){
    console.log(this.props);
		return (
      <div className="recommendations">
        <UserHeader user={this.props.user}/>
        <RecommendationFilters />
        <BooksList data={this.props.data} />
      </div>	
			);
	}
});

var AMAZON_DATA = [ { ASIN: '1118531647',
    DetailPageURL: 'http://www.amazon.com/JavaScript-JQuery-Interactive-Front-End-Development/dp/1118531647%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1118531647',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41DJtQp8RoL._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41DJtQp8RoL._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41DJtQp8RoL.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'Jon Duckett',
       Binding: 'Paperback',
       EAN: '9781118531648',
       EANList: [Object],
       Edition: '1',
       ISBN: '1118531647',
       IsEligibleForTradeIn: '1',
       ItemDimensions: [Object],
       Label: 'Wiley',
       Languages: [Object],
       ListPrice: [Object],
       Manufacturer: 'Wiley',
       NumberOfItems: '1',
       NumberOfPages: '640',
       PackageDimensions: [Object],
       ProductGroup: 'Book',
       ProductTypeName: 'ABIS_BOOK',
       PublicationDate: '2014-06-30',
       Publisher: 'Wiley',
       Studio: 'Wiley',
       Title: 'JavaScript and JQuery: Interactive Front-End Web Development',
       TradeInValue: [Object] },
    OfferSummary:
     { LowestNewPrice: [Object],
       LowestUsedPrice: [Object],
       TotalNew: '76',
       TotalUsed: '53',
       TotalCollectible: '0',
       TotalRefurbished: '0' },
    Offers:
     { TotalOffers: '1',
       TotalOfferPages: '1',
       MoreOffersUrl: 'http://www.amazon.com/gp/offer-listing/1118531647%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D1118531647',
       Offer: [Object] } },
  { ASIN: '1497408180',
    DetailPageURL: 'http://www.amazon.com/Smarter-Way-Learn-JavaScript-technology/dp/1497408180%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1497408180',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/512KPmZIG7L._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/512KPmZIG7L._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/512KPmZIG7L.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'Mark Myers',
       Binding: 'Paperback',
       EAN: '9781497408180',
       EANList: [Object],
       Edition: '1',
       ISBN: '1497408180',
       IsEligibleForTradeIn: '1',
       ItemDimensions: [Object],
       Label: 'CreateSpace Independent Publishing Platform',
       Languages: [Object],
       ListPrice: [Object],
       Manufacturer: 'CreateSpace Independent Publishing Platform',
       NumberOfItems: '1',
       NumberOfPages: '254',
       PackageDimensions: [Object],
       ProductGroup: 'Book',
       ProductTypeName: 'ABIS_BOOK',
       PublicationDate: '2014-03-20',
       Publisher: 'CreateSpace Independent Publishing Platform',
       Studio: 'CreateSpace Independent Publishing Platform',
       Title: 'A Smarter Way to Learn JavaScript: The new approach that uses technology to cut your effort in half',
       TradeInValue: [Object] },
    OfferSummary:
     { LowestNewPrice: [Object],
       LowestUsedPrice: [Object],
       TotalNew: '18',
       TotalUsed: '7',
       TotalCollectible: '0',
       TotalRefurbished: '0' },
    Offers:
     { TotalOffers: '1',
       TotalOfferPages: '1',
       MoreOffersUrl: 'http://www.amazon.com/gp/offer-listing/1497408180%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D1497408180',
       Offer: [Object] } },
  { ASIN: '0596517742',
    DetailPageURL: 'http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D0596517742',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/518QVtPWA7L._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/518QVtPWA7L._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/518QVtPWA7L.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'Douglas Crockford',
       Binding: 'Paperback',
       Brand: 'Brand: Yahoo Press',
       CatalogNumberList: [Object],
       EAN: '9780596517748',
       EANList: [Object],
       Edition: '1st',
       Feature: 'Used Book in Good Condition',
       ISBN: '0596517742',
       IsEligibleForTradeIn: '1',
       ItemDimensions: [Object],
       Label: 'O\'Reilly Media',
       Languages: [Object],
       ListPrice: [Object],
       Manufacturer: 'O\'Reilly Media',
       MPN: '978-0-596-51774-8',
       NumberOfItems: '1',
       NumberOfPages: '176',
       PackageDimensions: [Object],
       PackageQuantity: '1',
       PartNumber: '978-0-596-51774-8',
       ProductGroup: 'Book',
       ProductTypeName: 'ABIS_BOOK',
       PublicationDate: '2008-05',
       Publisher: 'O\'Reilly Media',
       Studio: 'O\'Reilly Media',
       Title: 'JavaScript: The Good Parts',
       TradeInValue: [Object] },
    OfferSummary:
     { LowestNewPrice: [Object],
       LowestUsedPrice: [Object],
       TotalNew: '42',
       TotalUsed: '39',
       TotalCollectible: '0',
       TotalRefurbished: '0' },
    Offers:
     { TotalOffers: '1',
       TotalOfferPages: '1',
       MoreOffersUrl: 'http://www.amazon.com/gp/offer-listing/0596517742%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0596517742',
       Offer: [Object] } },
  { ASIN: 'B00JUI6LUQ',
    DetailPageURL: 'http://www.amazon.com/Thinking-JavaScript-Aravind-Shenoy-ebook/dp/B00JUI6LUQ%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00JUI6LUQ',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51Jn%2B%2BniruL._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51Jn%2B%2BniruL._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51Jn%2B%2BniruL.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'Aravind Shenoy',
       Binding: 'Kindle Edition',
       Format: 'Kindle eBook',
       Label: 'Packt Publishing',
       Languages: [Object],
       Manufacturer: 'Packt Publishing',
       NumberOfPages: '40',
       ProductGroup: 'eBooks',
       ProductTypeName: 'ABIS_EBOOKS',
       PublicationDate: '2014-04-14',
       Publisher: 'Packt Publishing',
       ReleaseDate: '2014-04-14',
       Studio: 'Packt Publishing',
       Title: 'Thinking in JavaScript' } },
  { ASIN: '0596805527',
    DetailPageURL: 'http://www.amazon.com/JavaScript-Definitive-Guide-Activate-Guides/dp/0596805527%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D0596805527',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51WD-F3GobL._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51WD-F3GobL._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51WD-F3GobL.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'David Flanagan',
       Binding: 'Paperback',
       Brand: 'Brand: O\'Reilly Media',
       EAN: '9780596805524',
       EANList: [Object],
       Edition: '6th',
       Feature: 'Used Book in Good Condition',
       ISBN: '0596805527',
       IsEligibleForTradeIn: '1',
       ItemDimensions: [Object],
       Label: 'O\'Reilly Media',
       Languages: [Object],
       ListPrice: [Object],
       Manufacturer: 'O\'Reilly Media',
       MPN: '978-0-596-80552-4',
       NumberOfItems: '1',
       NumberOfPages: '1096',
       PackageDimensions: [Object],
       PackageQuantity: '1',
       PartNumber: '978-0-596-80552-4',
       ProductGroup: 'Book',
       ProductTypeName: 'ABIS_BOOK',
       PublicationDate: '2011-05-13',
       Publisher: 'O\'Reilly Media',
       SKU: '9780596805524',
       Studio: 'O\'Reilly Media',
       Title: 'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)',
       TradeInValue: [Object] },
    OfferSummary:
     { LowestNewPrice: [Object],
       LowestUsedPrice: [Object],
       TotalNew: '45',
       TotalUsed: '35',
       TotalCollectible: '0',
       TotalRefurbished: '0' },
    Offers:
     { TotalOffers: '1',
       TotalOfferPages: '1',
       MoreOffersUrl: 'http://www.amazon.com/gp/offer-listing/0596805527%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D0596805527',
       Offer: [Object] } },
  { ASIN: '1118907442',
    DetailPageURL: 'http://www.amazon.com/Web-Design-HTML-JavaScript-jQuery/dp/1118907442%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1118907442',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41hyTxIxT1L._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41hyTxIxT1L._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41hyTxIxT1L.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'Jon Duckett',
       Binding: 'Paperback',
       EAN: '9781118907443',
       EANList: [Object],
       Edition: '1',
       ISBN: '1118907442',
       IsEligibleForTradeIn: '1',
       ItemDimensions: [Object],
       Label: 'Wiley',
       Languages: [Object],
       ListPrice: [Object],
       Manufacturer: 'Wiley',
       NumberOfItems: '1',
       NumberOfPages: '1152',
       OperatingSystem: 'Internet',
       PackageDimensions: [Object],
       ProductGroup: 'Book',
       ProductTypeName: 'ABIS_BOOK',
       PublicationDate: '2014-07-08',
       Publisher: 'Wiley',
       Studio: 'Wiley',
       Title: 'Web Design with HTML, CSS, JavaScript and jQuery Set',
       TradeInValue: [Object] },
    OfferSummary:
     { LowestNewPrice: [Object],
       LowestUsedPrice: [Object],
       TotalNew: '46',
       TotalUsed: '13',
       TotalCollectible: '0',
       TotalRefurbished: '0' },
    Offers:
     { TotalOffers: '1',
       TotalOfferPages: '1',
       MoreOffersUrl: 'http://www.amazon.com/gp/offer-listing/1118907442%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D1118907442',
       Offer: [Object] } },
  { ASIN: '1593275404',
    DetailPageURL: 'http://www.amazon.com/Principles-Object-Oriented-JavaScript-Nicholas-Zakas/dp/1593275404%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1593275404',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51%2BUy4JxjVL._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51%2BUy4JxjVL._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51%2BUy4JxjVL.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'Nicholas C. Zakas',
       Binding: 'Paperback',
       EAN: '9781593275402',
       EANList: [Object],
       Edition: '1',
       ISBN: '1593275404',
       IsEligibleForTradeIn: '1',
       ItemDimensions: [Object],
       Label: 'No Starch Press',
       Languages: [Object],
       ListPrice: [Object],
       Manufacturer: 'No Starch Press',
       NumberOfItems: '1',
       NumberOfPages: '120',
       PackageDimensions: [Object],
       ProductGroup: 'Book',
       ProductTypeName: 'ABIS_BOOK',
       PublicationDate: '2014-02-23',
       Publisher: 'No Starch Press',
       Studio: 'No Starch Press',
       Title: 'The Principles of Object-Oriented JavaScript',
       TradeInValue: [Object] },
    OfferSummary:
     { LowestNewPrice: [Object],
       LowestUsedPrice: [Object],
       TotalNew: '51',
       TotalUsed: '12',
       TotalCollectible: '0',
       TotalRefurbished: '0' },
    Offers:
     { TotalOffers: '1',
       TotalOfferPages: '1',
       MoreOffersUrl: 'http://www.amazon.com/gp/offer-listing/1593275404%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D1593275404',
       Offer: [Object] } },
  { ASIN: 'B0084HJE0S',
    DetailPageURL: 'http://www.amazon.com/JavaScript-HTML5-Now-Kyle-Simpson-ebook/dp/B0084HJE0S%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0084HJE0S',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51rvw49RejL._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51rvw49RejL._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51rvw49RejL.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'Kyle Simpson',
       Binding: 'Kindle Edition',
       Edition: '1',
       EISBN: '9781449339074',
       Format: 'Kindle eBook',
       Label: 'O\'Reilly Media',
       Languages: [Object],
       Manufacturer: 'O\'Reilly Media',
       NumberOfPages: '23',
       ProductGroup: 'eBooks',
       ProductTypeName: 'ABIS_EBOOKS',
       PublicationDate: '2012-06-30',
       Publisher: 'O\'Reilly Media',
       ReleaseDate: '2012-06-30',
       Studio: 'O\'Reilly Media',
       Title: 'JavaScript and HTML5 Now' } },
  { ASIN: 'B00YQB5JPK',
    DetailPageURL: 'http://www.amazon.com/JavaScript-Ultimate-Beginners-Learning-Programming-ebook/dp/B00YQB5JPK%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00YQB5JPK',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51AMBxh%2BoUL._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51AMBxh%2BoUL._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/51AMBxh%2BoUL.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: [Object],
       Binding: 'Kindle Edition',
       Format: 'Kindle eBook',
       IsAdultProduct: '0',
       Languages: [Object],
       NumberOfPages: '157',
       ProductGroup: 'eBooks',
       ProductTypeName: 'ABIS_EBOOKS',
       PublicationDate: '2015-06-01',
       ReleaseDate: '2015-06-01',
       Title: 'JavaScript: Crash Course - The Ultimate Beginner\'s Course to Learning JavaScript Programming in Under 12 Hours' } },
  { ASIN: '1493692615',
    DetailPageURL: 'http://www.amazon.com/Software-Engineer-Learns-JavaScript-jQuery/dp/1493692615%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1493692615',
    ItemLinks: { ItemLink: [Object] },
    SmallImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41nopSDM91L._SL75_.jpg',
       Height: [Object],
       Width: [Object] },
    MediumImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41nopSDM91L._SL160_.jpg',
       Height: [Object],
       Width: [Object] },
    LargeImage:
     { URL: 'http://ecx.images-amazon.com/images/I/41nopSDM91L.jpg',
       Height: [Object],
       Width: [Object] },
    ImageSets: { ImageSet: [Object] },
    ItemAttributes:
     { Author: 'Dane Cameron',
       Binding: 'Paperback',
       EAN: '9781493692613',
       EANList: [Object],
       Edition: '1st',
       ISBN: '1493692615',
       IsEligibleForTradeIn: '1',
       ItemDimensions: [Object],
       Label: 'CreateSpace Independent Publishing Platform',
       Languages: [Object],
       ListPrice: [Object],
       Manufacturer: 'CreateSpace Independent Publishing Platform',
       NumberOfItems: '1',
       NumberOfPages: '256',
       PackageDimensions: [Object],
       ProductGroup: 'Book',
       ProductTypeName: 'ABIS_BOOK',
       PublicationDate: '2013-11-25',
       Publisher: 'CreateSpace Independent Publishing Platform',
       Studio: 'CreateSpace Independent Publishing Platform',
       Title: 'A Software Engineer Learns HTML5, JavaScript and jQuery',
       TradeInValue: [Object] },
    OfferSummary:
     { LowestNewPrice: [Object],
       LowestUsedPrice: [Object],
       TotalNew: '20',
       TotalUsed: '10',
       TotalCollectible: '0',
       TotalRefurbished: '0' },
    Offers:
     { TotalOffers: '1',
       TotalOfferPages: '1',
       MoreOffersUrl: 'http://www.amazon.com/gp/offer-listing/1493692615%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3D1493692615',
       Offer: [Object] } } ];



var USER_DATA = {
  "name": "Chris Saden",
  "birthday": "05/22/1986",
  "id": "10100966909272887",
  "photo": "https://scontent.fsjc1-2.fna.fbcdn.net/hphotos-xpa1/v/t1.0-9/1526674_10100494800667317_1991372456_n.jpg?oh=b17d8a8431044feacd81f35b67b8a0af&oe=5675945F"
};

React.render(<GiftRecommendations data={AMAZON_DATA} user={USER_DATA}/>, document.getElementById('recommended-gifts'));

