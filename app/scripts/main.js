'use strict';

Parse.initialize('8kYoQFRTqcpqpdaAm0QNPKMtjsQBuYRdmxS0VJNK', 'MALXhvfAMThpiDHZVxnEIJvJ6FSNJDwR4blEojl5');


// Clicking post-upload-button checks to see if there is a file
// (fileUploadControl.files.length > 0) selected and available 
// for upload, if so, it creates a new Parse.File.

$('.post-upload-button').click(function(){

    console.log('button clicked');

    var fileUploadControl = $('.postUpload')[0];

    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = 'photo.jpg';

        var parseFile = new Parse.File(name, file);
        parseFile.save().then(function(){

            var post = new Post();
            post.set({
                'postCaption' : $('.postCaptionText'),
                'postPhoto'   : parseFile.url()
            });

            post.save().done(function(){

            });

        });
    }
});


// Parse.Object ≈ Backbone.Model

var Post = Parse.Object.extend({
    className: 'post'
});

// Parse.Collection ≈ Backbone.Collection

var PostCollection = Parse.Collection.extend({
    model: Post
});


//

console.log('Thumbnail Grid View Script Loaded');

var ThumbnailView = Parse.View.extend({

    className: 'thumbnail',

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









