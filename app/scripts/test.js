Parse.initialize("8kYoQFRTqcpqpdaAm0QNPKMtjsQBuYRdmxS0VJNK", "MALXhvfAMThpiDHZVxnEIJvJ6FSNJDwR4blEojl5");

// Model

'use strict';

console.log('models loaded');

var Photo = Parse.Object.extend({
  
    defaults: {
            url: '',
            name: '',
            position: '',
            squadNumber: '',
            clubTeam: ''
        },

        idAttribute: '_id'
    });

// Collection

var PhotoCollection = Parse.Collection.extend({
    model: Photo,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/WHC-Picture-Gallery'
});


// Thumbnail Grid View

console.log('thumbnail view script loaded');

var ThumbnailView = Backbone.View.extend({

    className: 'thumbnail',

    template: _.template($('.thumbnail-template').text()),

    events: {
        'click' : 'showDetailView',
    },

    initialize: function(){

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);

        $('.thumbnails-container').append(this.el);
        this.render();
    },

    render: function(){
        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
    },

    showDetailView: function(){
        detailViewInstance.remove();
        detailViewInstance = new DetailView({model: this.model});
    }

});


// Detail View

console.log('photo detail view script loaded');

var DetailView = Backbone.View.extend({

    className: 'detail-view',

    template: _.template($('.detail-view-template').text()),

    events: {
        'click .save-button'    : 'updatePhotoModel',
        'click .delete-button'  : 'deletePhotoModel',
        'click .new-button'     : 'createNewPhoto',
        'click .add-player'     : 'clearPlayerInputValues'
    },

    initialize: function(){
        this.listenTo(this.model, 'add', function(photo){
            new ThumbnailView({model: photo});
        });

        this.listenTo(this.model, 'add', function(photo){
            new Photo({model: photo});
        });

        this.listenTo(this.model, 'change', this.render);

        $('.detail-container').append(this.el);
        this.render();
    },

    render: function(){

        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
        return this;
    },

    updatePhotoModel: function(){

        // var that = this;

        this.model.set({
            url:          this.$el.find('.url-input').val(),
            name:         this.$el.find('.name-input').val(),
            position:     this.$el.find('.position-input').val(),
            squadNumber:  this.$el.find('.squadNumber-input').val(),
            clubTeam:     this.$el.find('.clubTeam-input').val()
        });

        photos.add(this.model);

        this.model.save().done(function(){

        });
    },

    deletePhotoModel: function(){
        
        this.model.destroy();
        this.remove();
        window.detailViewInstance = new DetailView({model: photos.first()});

    },

    clearPlayerInputValues: function(){

        this.$el.find('url-input').val('');
        this.$el.find('img').attr('src','http://placehold.it/334x222');

        $('.url-input').val('');
        $('.name-input').val('');
        $('.position-input').val('');
        $('.squadNumber-input').val('');
        $('.clubTeam-input').val('');
      
    },

    // createNewPhoto: function(){

    //   var objImage = new Photo($('.url-input').val(), $('.name-input').val());
    //   var objThumbnailModel = PhotoCollection.add(objImage);

    //   objThumbnailModel.save();
    //   new ThumbnailView({model: objThumbnailModel});

    //   this.model.save().done(function(){
    //   that.$el.find('.new-button').html('Saved!')
    // })

    // },

    createNewPhoto: function(){
    
        var renderedTemplate = this.templateEdit(this.model.attributes);
        this.$el.html(renderedTemplate);

        var photoInstance = new Photo();
        this.model = photoInstance;

    },

});


// Create New Instances

var photos = new PhotoCollection();
var detailViewInstance;

photos.fetch().done(function(){
    photos.each(function(photo){

        new ThumbnailView({model: photo});

    });

    detailViewInstance = new DetailView({ model: photos.first() });
});