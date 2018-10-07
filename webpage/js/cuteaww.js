var urlBase = "https://glrecdzo5k.execute-api.us-east-1.amazonaws.com/Dev/"

var subreddits = ['catpictures','cats','Catswithjobs','dogpictures','dogswithjobs','dogs','aww','awwgifs','awwakeup'];

Vue.component('results-list', {
    data: function () {
        return {
            value: 0,
            posts: [],
            responses: new Map(),
            selected: subreddits,
            optionsCat: [
              {text: '/r/cats', value: 'cats'},
              {text: '/r/catpictures', value: 'catpictures'},
              {text: '/r/catswithjobs', value: 'Catswithjobs'}
            ],
            optionsDog: [
              {text: '/r/dogs', value: 'dogs'},
              {text: '/r/dogpictures', value: 'dogpictures'},
              {text: '/r/dogswithjobs', value: 'dogswithjobs'}
            ]
            ,
            optionsAnimals: [
              {text: '/r/aww', value: 'aww'},
              {text: '/r/awwgifs', value: 'awwgifs'},
              {text: '/r/awwakeup', value: 'awwakeup'}
            ]
        }
    },
    created(){
      for(var subreddit in subreddits){
          var promise = Promise.resolve(
            $.ajax({
              type: "GET",
              url: urlBase + subreddits[subreddit],
              dataType: "json",
              crossDomain: true
            })
          )
          promise.then(response => {
            response.sort(compare);
            for(var index in response){

              var post = response[index];
              if(post.bandwidth  > 1 && !post.is_album && !post.link.endsWith("mp4")){
                this.posts =  this.posts.concat(post);
              }
            }
          });
        }
        window.dispatchEvent(new Event("scroll"))
    },
    methods: {
      updateSlide (value) {
        this.value = value;
        this.$refs.modal1.show();
        window.dispatchEvent(new Event("scroll"))
      },
      checkShow(post){
        return this.selected.includes(post.subreddit);
      },
      sendEvent(){
        window.dispatchEvent(new Event("scroll"))
      }
    }
});

function compare(postA, postB) {
  return postB.datetime - postA.datetime;
}

Vue.filter('formatDate', function(value) {
  if (value) {
    return new Date(value * 1000).toDateString();
  }
});

Vue.filter('formatPostURL', function(url) {
  if(url.endsWith("h.gif")){
    return url.substring(0, url.length - 5) + ".gif";
  }
  return url;
});

Vue.filter('formatImgurURL', function(id) {
  return 'https://imgur.com/' + id;
});

new Vue({
    el: '#app',
});
