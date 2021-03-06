angular.module('drsmith.controllers.commentsctrl', [])
.controller("commentsctrl",function($scope,$http,$timeout,$rootScope,$stateParams){
  console.clear()

  $scope.Goal_Comments_Refresh=function(){
    console.log('Goal_Comments_Refresh......Begin async operation......');
    $timeout($scope.getcomments(),1500)
  }


  
  $scope.Task_Comments_Refresh=function(){
    console.log('Task_Comments_Refresh........Begin async operation......');
    $timeout($scope.getcomments_on_task(),1500)
  }


  $scope.Interaction_Comments_Refresh=function(){
    console.log('Interaction_Comments_Refresh....Begin async operation......');
    $timeout($scope.getintercomments(),1500)
  }


    $scope.getintercomments=function(){
      $http(
        {
          url:localStorage.getItem('url')+"/myproject/view_meeting_schedule_comment.php",
          method:"GET",
          params:{schedule_id:$stateParams.interaction_id}
        }
      )
      .then(function(response){
        $scope.intercomments=response.data.comment;
        $scope.interaction=response.data.meeting_schedule
        console.log($scope.intercomments) ;
        console.log($scope.interaction);
        $scope.comment="";
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
    $scope.inter_commentObj={};
    $scope.inter_commentObj={
      comment:''
    };
    $scope.addintercomment=function(comment){
      console.log($stateParams.interaction_id)
      console.log(localStorage.getItem('id'))
      console.log(localStorage.getItem('type'))
      console.log( $scope.inter_commentObj.comment)
      if($scope.inter_commentObj.comment.length>0){
      $http(
        {
          url:localStorage.getItem('url')+"/myproject/meeting_schedule_comment.php",
          method:"GET",
         params:{schedule_id:$stateParams.interaction_id,commentor_id:localStorage.getItem('id'),
                  comment_by:localStorage.getItem('type'),comment_text:$scope.inter_commentObj.comment}
        }
      )
      .then(function(response){
        $scope.newcomments=response.data;
        console.log($scope.newcomments);
        $scope.getintercomments();
        $scope.inter_commentObj={
          comment:''
        };
      })
    }
    else{
      alert("Please Enter Comment")
    }
     
     }
     //function for mentor will get the comments on goals of mentee
   $scope.getcomments=function(){
    $http(
      {
        url:localStorage.getItem('url')+"/myproject/mentee_goals_comment.php",
        method:"GET",
        params:{id:localStorage.getItem('id'),mentee_goal_id:$stateParams.id}
      }
    )
    .then(function(response){
      console.log(response.data)
      $scope.comments=response.data.comment;
      $scope.goal=response.data.goal;
      $scope.mentee_id=$scope.goal[0].mentee_id;
      console.log($scope.comments)
      console.log($scope.goal) 
      $scope.$broadcast('scroll.refreshComplete');
    })
   }
    //function for mentor will add the comments on goals of mentee
    $scope.commentObj_goal={};
    $scope.commentObj_goal={
      comment:''
    }
   $scope.addcomment=function(){
     console.log($stateParams.id)
     console.log(localStorage.getItem('id'))
     console.log()
     console.log(localStorage.getItem('type'))
     if($scope.commentObj_goal.comment.length>0){
    $http(
      {
        url:localStorage.getItem('url')+"/myproject/add_mentee_goals_comment.php",
        method:"GET",
       params:{mentee_goal_id:$stateParams.id,comment_text:$scope.commentObj_goal.comment,
        commentor_id:localStorage.getItem('id'),comment_by:localStorage.getItem('type')}
      }
    )
    .then(function(response){
      $scope.newcomments=response.data;
      console.log($scope.newcomments);
      $scope.commentObj_goal={
        comment:''
      }
      $scope.getcomments();
    })
  }
  else{
    alert("Please Enter Comment")
  }
    
   }
    //function for mentor and mentee will get the comments on tasks 
   $scope.getcomments_on_task=function(){
    $http({
      url:localStorage.getItem('url')+"/myproject/mentee_task_comment.php",
      method:"GET",
      params:{mentee_task_id:$stateParams.id}
    })
    .then(function(response){
      $scope.task_comments=response.data.comment;
      $scope.task=response.data.task;
      $scope.mentee_id=$scope.task[0].mentee_id;
      console.log($scope.task_comments)
      console.log($scope.task)
      $scope.$broadcast('scroll.refreshComplete');
    })
  }
  //function for mentor and mentee will add the comments on tasks
  $scope.commentObj={};
  $scope.commentObj={
    comment:''
  }
  $scope.addcomment_on_task=function(mentee_id){
    console.log(mentee_id)
    console.log($scope.commentObj.comment)
    console.log($scope.commentObj.comment.length)
    console.log($stateParams.id)
    console.log(localStorage.getItem('id'))
    console.log(localStorage.getItem('type'))
    if($scope.commentObj.comment.length>0){
   $http(
     {
       url:localStorage.getItem('url')+"/myproject/add_mentee_task_comment.php",
       method:"GET",
      params:{mentee_task_id:$stateParams.id,mentee_id:mentee_id,
        comment_text:$scope.commentObj.comment,commentor_id:localStorage.getItem('id'),comment_by:localStorage.getItem('type')}
     }
   )
   .then(function(response){
     $scope.newcomments=response.data;
     console.log($scope.newcomments);
     $scope.getcomments_on_task();
     $scope.commentObj={
      comment:''
    }
   })
  }
  else{
    alert("Please Enter text")
  }
   
  }
  })