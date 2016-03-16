var TicTacToeGame = angular.module('TicTacToeGame', []);
TicTacToeGame.controller('TicTacToeCtrl',['$scope','$http',function ($scope,$http){
	$http.get('/login_db').success(function(response)
			{
				console.log("Hello world from controller");
				$scope.login_db= response;				
				console.log(response);
			});

	var turn = -1;
	var tttdata = [[0,0,0],[0,0,0],[0,0,0]];
	var ttttext = [[" "," "," "],[" "," "," "],[" "," "," "]];
	var tttcolor = [[true,true,true],[true,true,true],[true,true,true]]; 
	$scope.tttdata = tttdata;
	$scope.ttttext = ttttext;
	$scope.turn = turn;	
	$scope.tttcolor = tttcolor;
	var game_ended = false;
	$scope.game_ended = game_ended;
	var has_game_started = false;
	$scope.has_game_started =has_game_started;
	var Xscore = 0;
	$scope.Xscore = Xscore;
	var Oscore = 0;
	$scope.Oscore = Oscore;
	var button_score = 0;
	$scope.button_score = button_score;
	var logged_in = false;

	$scope.login = function(){
		console.log("im in login()");
		$http.get('/db/login_db/', {params: {'em': $scope.user.email,'pwd': $scope.user.password}}).success(function(response)
			{
				console.log("check reponse");
		console.log(response);

		if(response!= null){
			alert("You are successfully Logged in!! Welcome" + " "+ $scope.user.email);
			$scope.logged_in = logged_in;
			$scope.logged_in = true;

		}
		else {

			alert("invalid email or password");
			$scope.user.email="";
			$scope.user.password= "";
		}
	  });
		
	};

	$scope.upload = function(){
		
	}

			
	$scope.logout = function(){
		$scope.logged_in= false;
	};

	$scope.register = function(){
		alert("You are registered successfully! Go & Login");
		$http.post('/login_db', {'em': $scope.user.emailsignup,'pwd': $scope.user.passwordsignup, 'pic': $scope.user.photo}).success(function(response){
			console.log(response);
		});
		$scope.user.emailsignup="";
		$scope.user.passwordsignup= "";
		$scope.user.passwordsignup_confirm= "";	
	}

   $scope.selection = function(select)
   {
   	console.log(select);
   	if($scope.has_game_started==false){
   		if($scope.select == "O"){
			console.log(select);
			$scope.turn = 1;
			$scope.message = $scope.name2 +" "+ "plays with: " + "X";
			return $scope.select;
			}
		else if ($scope.select== "X"){
			console.log(select);		
			$scope.turn = -1;
			$scope.message = $scope.name2 +" "+ "plays with: " + "O";
			return $scope.select;
			}
		console.log($scope.turn);
		}
		$scope.has_game_started = true;

   };

   
	$scope.Click = function(i,j)
	{
		console.log("has game ended?"+ $scope.game_ended);
		$scope.button_score++;

		if($scope.game_ended == true){ return;} 

		if($scope.tttdata[i][j] == 0){
			$scope.turn = $scope.turn * -1;
			$scope.tttdata[i][j] = $scope.turn;
			if($scope.turn==1)
			{
				console.log($scope.turn);
				$scope.ttttext[i][j] = "X";
			}
			else
			{
				console.log($scope.turn);
				$scope.ttttext[i][j] = "O";
			}

		}

		if(Check_win()){
			$scope.game_ended = true;
			$scope.Update_score();
			$scope.message_win = "You Win!! Click on Reset and play next round";
			}
		else {
				if($scope.turn == 1){
					$scope.message_win = $scope.name2 + "'s " + "turn";	

				}
			else if($scope.turn == -1){
				$scope.message_win = $scope.name1 + "'s " + "turn";	

				};
			};	
		if($scope.button_score == 9){
				$scope.game_ended = true;
				$scope.message_win = "Its a draw! Click on Reset and play again";
			}	
				
	};

	

	var Check_win = function()
	{

		for(var a =0; a<=8; a++){
			for(var b =a+1; b<=8; b++){
				for(var c =b+1; c<=8; c++)
				{
					var m1 = a%3;
					var n1 = (a-m1)/3;

					var m2 = b%3;
					var n2 = (b-m2)/3;
					
					var m3 = c%3;
					var n3 = (c-m3)/3;

					
					if(($scope.ttttext[m1][n1]!= " ") && ($scope.ttttext[m1][n1] == $scope.ttttext[m2][n2]) && ($scope.ttttext[m2][n2] == $scope.ttttext[m3][n3])){
						console.log("3 same text points found");
						if ((n3*m2 - n3*m1) == (m3*n2 - m3*n1 + m2*n1 - m1*n2))
						{
							console.log("text in a line");
							$scope.tttcolor[m2][n2] = false;
							$scope.tttcolor[m3][n3] = false;
							$scope.tttcolor[m1][n1] = false;

							console.log("All winning coords:"+ m1+ "," + n1 + " " +m2+ "," +n2 + " " + m3 + ","+ n3);

							$scope.Update_score = function(){
								if($scope.ttttext[m1][n1]=="X"){
									$scope.Xscore++;
									}
								else {
									$scope.Oscore++;
									}

								};

							return true;				
						
						};
					};	
		

				};
			};
		};

		return false;	
		
	};

$scope.Reset = function(){
$scope.button_score = 0;	
$scope.has_game_started =false;
$scope.tttdata = [[0,0,0],[0,0,0],[0,0,0]];
$scope.ttttext = [[" "," "," "],[" "," "," "],[" "," "," "]];
$scope.tttcolor = [[true,true,true],[true,true,true],[true,true,true]];
$scope.game_ended = false;
$scope.message_win = " " ;
$scope.message = " " ;

}

$scope.StartNewGame = function(){
	$scope.Xscore = 0;
	$scope.Oscore = 0;
	$scope.name1 =" ";
	$scope.name2 =" ";
	$scope.select = " ";
	$scope.Reset();

}

$scope.DeleteAccount = function(id)
{
	console.log("im in remove function" + " "+ id );
	$http.delete('/db/login_db/' + id).success(function (response)
		{
			console.log(response);
		});
}	
}]);