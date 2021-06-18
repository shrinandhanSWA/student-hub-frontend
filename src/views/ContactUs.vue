<template>
    <div>
    <h1 class="title">
    Contact Us
    </h1>
    <p class="topic-content">
        Find any bugs? Have any suggestions for future development? Contact us now:

        - Ameena Hassan (ameenahassan1024@gmail.com)
        - Aayush Bhatt (aayush801@yahoo.com)
        - Shrinandhan Prabu (shrinandhancr@gmail.com)

    </p>   
    </div>
</template>

<style lang="stylus" scoped>

  .vote-icon {
    font-size : 35px
  }

  .topic-view
    background: #FFF
    border-radius: 20px
    padding: 10px 25px

  .title
    font-size: 25px
    font-weight: 400
    text-align: center
    color: #222
    margin-bottom: -30px
    margin-top: 200px

  .author
    display: flex
    align-items: center

  .author-right
    margin-left: 15px
    display: flex
    flex-direction: column

  .author-right-name
    margin-left: 0px
    display: flex
    flex-direction: row

  .author-name
    color: #444

  .profileType
    background-color: #3785ff
    margin: 3px

  .view-profile {
    color: #444
    text-decoration : none
  }
  .profile
    background-color: #3e8e41
    margin-left: 10px
    font-style: normal
    color: white
    border-radius: 4px
    padding-top: 1px
    padding-left: 3px
    padding-right: 3px
    padding-bottom: 1px

  .date
    color: #999
    font-size: 13px
    margin-top: 3px

  .topic-content
    line-height: 1.7
    color: #333
    margin-top: 20px
    text-align: center
    white-space: pre-line;

  .topic-footer
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 40px
    padding-bottom: 20px

  .topic-footer-reply
    display: flex
    align-items: center

  .topic-footer-reply-title
    font-size: 16px
    color: #333
    font-weight: 500
    margin: 0

  .reply-button
    margin-left: 20px
    font-size: 14px

  .action-button
    margin-left: 15px
    color: $primaryColor
    cursor: pointer

  .reply-icon
    margin-right: 3px

  .reply
    border-top: 1px solid #F0F0F0
    padding: 30px 0


  .votes {
    font-size: 25px;
  }

  .upvoted_color {
    color: #FF8B60;
  }

  .downvoted_color {
    color: #9494FF;
  }

</style>
