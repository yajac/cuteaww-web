var urlBase = "https://ags1tu3mc8.execute-api.us-east-1.amazonaws.com/stage1/"

var jsPromise1 = Promise.resolve(
  $.ajax({
    type: "GET",
    url: urlBase + "catpictures",
    dataType: "json",
    crossDomain: true
  })
);


var jsPromise2 = Promise.resolve(
  $.ajax({
    type: "GET",
    url: urlBase + "dogpictures",
    dataType: "json",
    crossDomain: true
  })
);

var jsPromise3 = Promise.resolve(
  $.ajax({
    type: "GET",
    url: urlBase + "aww",
    dataType: "json",
    crossDomain: true
  })
);
//
// var jsPromiseCat = Promise.resolve(
//   $.ajax({
//     type: "GET",
//     url: urlBase + "cats",
//     dataType: "json",
//     crossDomain: true
//   })
// );
//
// var jsPromiseDog = Promise.resolve(
//   $.ajax({
//     type: "GET",
//     url: urlBase + "dogs",
//     dataType: "json",
//     crossDomain: true
//   })
// );
//
// var jsPromiseAwwGif = Promise.resolve(
//   $.ajax({
//     type: "GET",
//     url: urlBase + "awwgifs",
//     dataType: "json",
//     crossDomain: true
//   })
// );

Vue.component('results-list', {
    data: function () {
        return {
            value: 0,
            posts: [],
            //selected: ['cats','catpictures','dogs','dogpictures','aww','awwgifs'],
            selected: ['catpictures','dogpictures','aww'],
            optionsCat: [
              //{text: '/r/cats', value: 'cats'},
              {text: '/r/catpictures', value: 'catpictures'}
            ],
            optionsDog: [
              //{text: '/r/dogs', value: 'dogs'},
              {text: '/r/dogpictures', value: 'dogpictures'}
            ]
            ,
            optionsAnimals: [
              //{text: '/r/awwgifs', value: 'awwgifs'},
              {text: '/r/aww', value: 'aww'}
            ]
        }
    },
    //mounted () {
    created(){
      jsPromise1.then((response) => {
          for(var index in response){
            var post = response[index];
            if(post.thumbnail  && !post.is_self && !post.is_video && post.domain != "v.redd.it" && post.domain != "gfycat.com" && post.thumbnail != "nsfw"){
              this.posts =  this.posts.concat(post);
            }
          }
      });
      jsPromise2.then((response) => {
        for(var index in response){
          var post = response[index];
          if(post.thumbnail  && !post.is_self && !post.is_video && post.domain != "v.redd.it" && post.domain != "gfycat.com" && post.thumbnail != "nsfw"){
            this.posts =  this.posts.concat(post);
          }
        }
      });
      jsPromise3.then((response) => {
        for(var index in response){
          var post = response[index];
          if(post.thumbnail  && !post.is_self && !post.is_video && post.domain != "v.redd.it" && post.domain != "gfycat.com" && post.thumbnail != "nsfw"){
            this.posts =  this.posts.concat(post);
          }
        }
      });
      // jsPromiseCat.then((response) => {
      //     for(var index in response){
      //       this.posts =  this.posts.concat(response[index]);
      //     }
      // });
      // jsPromiseDog.then((response) => {
      //     for(var index in response){
      //       this.posts =  this.posts.concat(response[index]);
      //     }
      // });
      // jsPromiseAwwGif.then((response) => {
      //     for(var index in response){
      //       this.posts =  this.posts.concat(response[index]);
      //     }
      // });
    },
    methods: {
      updateSlide (value) {
        this.value = value;
        this.$refs.modal1.show();
      },
      checkShow(post){
        return this.selected.includes(post.subreddit);
      },
       filtered(posts){
         var newData = [];
         var selections = this.selected;
         posts.forEach(function(post) {
             if(post.thumbnail  && !post.is_self && !post.is_video && post.domain != "v.redd.it" && post.domain != "gfycat.com" && post.thumbnail != "nsfw"){
               newData.push(post);
             }
         });
        return newData;
      }

    }
});


Vue.filter('formatDate', function(value) {
  if (value) {
    return new Date(value * 1000).toDateString();
  }
});

Vue.filter('formatURL', function(id) {
  if (id) {
    return "https://www.reddit.com/" + id;
  }
});

Vue.filter('formatPostURL', function(url) {
  if(url.endsWith(".gifv")){
    return url.substring(0, url.length - 1);
  }
  if(url.includes("imgur.com")){
    return url.concat(".gif")
  }
  return url;
});


new Vue({
    el: '#app',
});
