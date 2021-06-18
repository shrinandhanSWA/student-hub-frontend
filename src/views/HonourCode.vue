<template>
    <div>
        <h1 class="title">
        Honour Code
        </h1>
        <p class="topic-content">
            This website has been created for the use of current students and alumni ('Users') of Harris Westminster Sixth Form (HWSF). 
            Users are only allowed to have 1 account each, and will refrain from posting profanity and overall unkind language during their use. 
            Users will not share the personal information of other users without their explicit permission to do so.

            The Administrators of this website reserve the right to:
            1. Approve or disapprove account requests
            2. Delete any posts and groups that do not contribute to the spirit of being kind, and
            3. Ban any accounts that require profanity to make their points
            
            Administrators also reserve the right to modify the user's honour code and their rights at any point of time. 
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
    margin-bottom: 30px

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
