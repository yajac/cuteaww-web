var urlBase = "https://fmwrsonnjg.execute-api.us-east-1.amazonaws.com/Stage/"

var jsPromiseAww = Promise.resolve(
  $.ajax({
    type: "GET",
    url: urlBase + "aww",
    dataType: "json",
    crossDomain: true
  })
);

Vue.component('results-list', {
    data: function () {
        return {
            value: 0,
            posts: [],
            selected: ['catpictures','dogpictures','aww'],
            optionsCat: [
              {text: '/r/catpictures', value: 'catpictures'}
            ],
            optionsDog: [
              {text: '/r/dogpictures', value: 'dogpictures'}
            ]
            ,
            optionsAnimals: [
              {text: '/r/aww', value: 'aww'}
            ]
        }
    },
    created(){
      jsPromiseAww.then((response) => {
          for(var index in response){
            var post = response[index];
            if(post.bandwidth  > 1 && !post.is_album && !post.link.endsWith("mp4")){
              this.posts =  this.posts.concat(post);
            }
          }
      });

    },
    methods: {
      updateSlide (value) {
        this.value = value;
        this.$refs.modal1.show();
      },
      checkShow(post){
        return this.selected.includes(post.subreddit);
      }
    }
});


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

new Vue({
    el: '#app',
});
