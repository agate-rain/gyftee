
var UserHeader = React.createClass({

  render: function(){
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
      <div className="books-list"> {books} </div>
    );
  }

});

var Book = React.createClass({

  render: function(){
    return (
      <div className="book-info">
        <div className="ASIN">{this.props.book.ASIN}</div>
        <div className="book-author">{this.props.book.Auther}</div>
        <div className="book-manufacturer">{this.props.book.Manufacturer}</div>
        <div className="book-title">{this.props.book.Title}</div>
      </div>
      );
  }
});


var GiftRecommendations = React.createClass({
	render: function(){
		return (
				<UserHeader user={this.props.user}/>
				<RecommendationFilters />
				<BooksList data={AMAZON_DATA} />
			);
	}
});




React.render(<GiftRecommendations data={AMAZON_DATA} user={USER_DATA}/>, document.getElementById('recommended-gifts'));


var AMAZON_DATA = [
  { 
    ASIN: '1118531647',
    DetailPageURL: 'http://www.amazon.com/JavaScript-JQuery-Interactive-Front-End-Development/dp/1118531647%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1118531647',
    ItemLinks: { ItemLink: [Object] },
    ItemAttributes:
    { 
      Author: 'Jon Duckett',
      Manufacturer: 'Wiley',
      ProductGroup: 'Book',
      Title: 'JavaScript and JQuery: Interactive Front-End Web Development' 
    } 
  },
  { 
    ASIN: '1497408180',
    DetailPageURL: 'http://www.amazon.com/Smarter-Way-Learn-JavaScript-technology/dp/1497408180%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1497408180',
    ItemLinks: { ItemLink: [Object] },
    ItemAttributes: 
    { 
      Author: 'Mark Myers',
      Manufacturer: 'CreateSpace Independent Publishing Platform',
      ProductGroup: 'Book',
      Title: 'A Smarter Way to Learn JavaScript: The new approach that uses technology to cut your effort in half' 
    } 
  },
  { 
    ASIN: '0596517742',
    DetailPageURL: 'http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D0596517742',
    ItemLinks: { ItemLink: [Object] },
    ItemAttributes:
    { 
      Author: 'Douglas Crockford',
      Manufacturer: 'O\'Reilly Media',
      ProductGroup: 'Book',
      Title: 'JavaScript: The Good Parts' 
    } 
  },
  { 
    ASIN: 'B00JUI6LUQ',
    DetailPageURL: 'http://www.amazon.com/Thinking-JavaScript-Aravind-Shenoy-ebook/dp/B00JUI6LUQ%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00JUI6LUQ',
    ItemLinks: { ItemLink: [Object] },
    ItemAttributes:
    { 
      Author: 'Aravind Shenoy',
      Manufacturer: 'Packt Publishing',
      ProductGroup: 'eBooks',
      Title: 'Thinking in JavaScript' 
    } 
  },
  { 
    ASIN: '0596805527',
    DetailPageURL: 'http://www.amazon.com/JavaScript-Definitive-Guide-Activate-Guides/dp/0596805527%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D0596805527',
    ItemLinks: { ItemLink: [Object] },
    ItemAttributes:
    { 
      Author: 'David Flanagan',
      Manufacturer: 'O\'Reilly Media',
      ProductGroup: 'Book',
      Title: 'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)' 
    } 
  },
  { 
    ASIN: '1118907442',
    DetailPageURL: 'http://www.amazon.com/Web-Design-HTML-JavaScript-jQuery/dp/1118907442%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1118907442',
    ItemLinks: { ItemLink: [Object] },
    ItemAttributes:
    { 
      Author: 'Jon Duckett',
      Manufacturer: 'Wiley',
      ProductGroup: 'Book',
      Title: 'Web Design with HTML, CSS, JavaScript and jQuery Set' 
    } 
  },
  { 
    ASIN: '1593275404',
    DetailPageURL: 'http://www.amazon.com/Principles-Object-Oriented-JavaScript-Nicholas-Zakas/dp/1593275404%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D1593275404',
    ItemLinks: { ItemLink: [Object] },
    ItemAttributes:
    { 
      Author: 'Nicholas C. Zakas',
      Manufacturer: 'No Starch Press',
      ProductGroup: 'Book',
      Title: 'The Principles of Object-Oriented JavaScript' 
    } 
  },
  { 
    ASIN: 'B0084HJE0S',
    DetailPageURL: 'http://www.amazon.com/JavaScript-HTML5-Now-Kyle-Simpson-ebook/dp/B0084HJE0S%3FSubscriptionId%3DAKIAIT6MPAH4YTKJ46BA%26tag%3Deric0e7-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0084HJE0S',
    ItemLinks: { ItemLink: [Object] },
    ItemAttributes:
    { 
      Author: 'Kyle Simpson',
      Manufacturer: 'O\'Reilly Media',
      ProductGroup: 'eBooks',
      Title: 'JavaScript and HTML5 Now' 
    } 
  }
];

var USER_DATA = {
  name: 'Chris Saden',
  birthday: '05/22/1986',
  id: '10100966909272887',
  photo: 'https://pbs.twimg.com/profile_images/574703388/smeagol.jpg'
};