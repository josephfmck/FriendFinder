//Required dependencies
var friends = require("../data/friends");		//take in friends array from friends.js

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare with friends in friends array
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var bestMatch = 0;

    //runs through all current friends in list
    for(var i=0; i<friends.length; i++){
      var scoresDiff = 0;     //set scoresDiff to 0 for each iteration
      //run through scores to compare friends
      for(var j=0; j<newFriendScores.length; j++){  //FOR each friend, takes question, subtracts user Score, adds to diff.
        scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j]))); 
        //ONCE total diff for one friend's 10 Q's is found, total diff is added to the ScoresArray
        //console.log(friends[i].name);
        //console.log('friend = ' + friends[i].scores[j]);
        //console.log('new = ' + newFriendScores[j]);
        //console.log('++++++')
        //console.log('diff = ' + scoresDiff);
        //console.log('========');

      } //update scoresDiff with absolute values of the diff of friend's scores and users scores 

      //push results into scoresArray       SCORESArray is a array of the total diff for each of the 5 friends

      scoresArray.push(scoresDiff);
      //console.log('ARRAY = ' + scoresArray);
      //console.log('----------------');
    }

    //after all friends are compared, find best match         BEST match = lowest diff score in Scoresarray
    for(var i=0; i<scoresArray.length; i++){      //loop through array
      if(scoresArray[i] <= scoresArray[bestMatch]){   //if the score in the array is less than equal to bestMatch
        bestMatch = i;          //set bestMatch to the current index
        //WILL loop through each friend index until the score in the the array is not less than bestMatch

        //console.log('array index = ' + scoresArray[i]);
        //console.log(scoresArray);
        //console.log('===========')

      }
    }

    //return bestMatch data
    var bff = friends[bestMatch];
    res.json(bff);

    //pushes new submission into the friendsList array
    friends.push(req.body);
  });
};

