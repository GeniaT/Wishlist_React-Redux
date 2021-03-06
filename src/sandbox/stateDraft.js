stateDraft = {
  loggedin: true,
  fetching: false,
  wishlists: [
    {
      id:uuid(),
      createdAt: '20180923',
      status: "Private",
      title:'for the living room',
      category: 'furniture',
      eventLinksIds: ['uiqopifjkdd', 'sqd2'],
      tags: ["wood","IKEA","cheap"],
      items: [
        {
          name: "book collector",
          description: undefined,
          picture: "http://flickr.com/test1",
          urlToBuy: "https://amazon.com/furni1",
          appriximatePrice: '50$',
          note: "written by Didam Miller"
        },
        {
          name: "table",
          description: undefined,
          picture: "http://flickr.com/test2",
          urlToBuy: "https://amazon.com/furni2",
          appriximatePrice: '50$',
          note: "for 8 people is ideal"
        },
        {
          name: "2 chairs",
          description: undefined,
          picture: "http://flickr.com/test3",
          urlToBuy: "https://amazon.com/furni3",
          appriximatePrice: '50$',
          note: undefined
        },
        {
          name: "TV",
          description: undefined,
          picture: "http://flickr.com/test4",
          urlToBuy: "https://amazon.com/furni4",
          appriximatePrice: '350$',
          note: undefined
        },
      ]
    },
    {
      id:uuid(),
      createdAt: '20171206',
      status: "Public",
      title:'for gaming room',
      category: 'video Games',
      eventLinks: ["for gaming time"],
      tags: ["PC","games", "PS4"],
      items: []
    },
    {
      id:uuid(),
      createdAt: '20160903',
      status: "Public",
      title:'for the kitchen',
      category: undefined,
      eventLinks: [],
      tags: undefined,
      items: []
    },
    {
      id:uuid(),
      createdAt: '20131020',
      status: "Private"
      title:'holiday stuff',
      category: 'holiday',
      eventLinks: ["summer holidays 2020"]
      tags: ["summer","holiday"],
      items: []
    }
  ]
  friends: ['qdsjl12c', 'kazdkpod1222', '9809887nlkqd'],
  feed: ['Sandro has 3 new followers', 'Giang now follows Kevin', 'Steph updated her "TV shows" whislist', 'Thomas updated his profile!'],
  suggestions: {
    books: ['CLRS', 'Tomorrow', 'Linear Algebra'],
    video games: ['GTA VI', 'Lineage III', 'FFX','Sim City 5', 'Commandos 3'],
    tech: ['GoPro5', 'Boose radio', 'Canon camera'],
    clothes: ['Hat Superdry', 'sweather' ,'gloves HB']
  },
  events: [
    {
      id:uuid(),
      date: "01/02/2017",
      title: "Kevin's brirthday",
      participants: ['Tamah','Louli','Jerome','Genia'],
      items: ['black t-shirt', "Nike hat"],
      reservedItems: ['Nike hat'],
      note: "Don't offer anything else please"
    },
    {
      id:uuid(),
      date: "01/02/2019",
      title: "Sandro's brirthday",
      participants: ['Olivier','Dimitri','Jerome','Genia'],
      items: ['Alienware Laptop','1b','DBZ Vegeta figure','2c','3g','Kosplay clothe #1'],
      reservedItems: ['Kosplay clothe #1', 'DBZ Vegeta figure', 'Alienware Laptop'],
      note: "Please reserve an item if you are about to buy it"
    },
    {
      id:uuid(),
      date: '20/03/2019',
      title: "Steph's graduation",
      participants: ["May", 'Elo', "Max", "Laura",'Genia'],
      items: ["SPA session", "massage", "highliner", "bikini"],
      reservedItems: ['massage', "bikini"],
      note: undefined
    },
    {
      id:uuid(),
      date: "05/12/2020",
      title: "Giang's wedding",
      participants: ['Sandro', "IssBrouk", 'Genia'],
      items: ['HP Laptop',"noodles", "botProgram", "Lineage Eternal", "LoL skin card"],
      reservedItems: ["LoL skin card", "noodles"],
      note: "priority on HP laptop please"
    }
  ],
  eventsWishlistsLinks:[
    ["X","cc6ddad2-434b-4c6c-91be-03271476ed4e","dd6ddad2"],
    ["1338", 1, 0],
    ["1339", 0, 1]
],
otherEventsParticipation:[],
}
