'use strict';

Parse.initialize('8kYoQFRTqcpqpdaAm0QNPKMtjsQBuYRdmxS0VJNK', 'MALXhvfAMThpiDHZVxnEIJvJ6FSNJDwR4blEojl5');

// Parse.Object ≈ Backbone.Model - Each Parse.Object is an instance of a 
// specific subclass ...

var Post = Parse.Object.extend({
    
    // with a class name that you can use to distinguish different sorts of data.
    
    className: 'post'
});

// Parse.Collection ≈ Backbone.Collection

var PostCollection = Parse.Collection.extend({
    model: Post
});


// Clicking post-upload-button checks to see if there is a file
// (fileUploadControl.files.length > 0) selected and available 
// for upload, if so, it creates a new Parse.File.

$('.post-upload-button').click(function(){

    console.log('button clicked');

    var fileUploadControl = $('.postUpload')[0];

    // this 'if' statement is saying that if the length of the files associated with
    // fileUploadControl are > 0 then there is a file waiting to be uploaded and the
    // function can proceed.

    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = 'photo.jpg';

        var parseFile = new Parse.File(name, file);
        parseFile.save().then(function(){

            console.log('I\'ve been saved!')

            // Here, the variable 'post' creates a new instance of the Parse.Object
            // variable 'Post' and has the key-value pairs of 'postCaption' and 
            // 'postPhoto' set to it.

            // var post = new Post();
            // post.set({
            //     'postCaption' : $('.postCaptionText'),
            //     'postPhoto'   : parseFile.url()

            var post = new Parse.Object("Post");
            post.set('postCaption', "Joe Smith");
            post.set('postPhoto', parseFile.url());
            post.save();

            });

            // 

            // post.save().done(function(){
            //       console.log('I\'ve been saved!')
            // });

            // app.collection.add(post);

        // });
    }
});





// Parse.View to Load Thumbnail Grid

console.log('Thumbnail Grid View Script Loaded');

var ThumbnailView = Parse.View.extend({

    className: 'thumbnails-container',

    template: _.template($('.thumbnail-template').text()),

    // events: {
    //     'click' : 'showDetailView',
    // },

    initialize: function(){

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);

        $('.thumbnails-container').prepend(this.el);
        this.render();
    },

    render: function(){
        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
    },

    // showDetailView: function(){
    //     detailViewInstance.remove();
    //     detailViewInstance = new DetailView({model: this.model});
    // }

});


// 

var AppView = Parse.View.extend({
    initialize: function () {
        this.collection = new PostCollection();
        this.collection.on('add', this.addPost);
        this.collection.fetch({add:true});
    },

    addPost: function (model){
        new ThumbnailView({model: model});
    }

});

var app = new AppView();









