(function($){
  $(function(){

  	var createRepoCard = function(repo) {
  		var card = $(".repoCard").clone();
  		card.find(".card-title").text(repo.name);
  		card.find(".repo_link").attr("href", repo.html_url);
  		card.find(".project-description").text(repo.description || " ");
  		card.find(".language").text(repo.language);
  		card.find(".star_count").text(repo.stargazers_count);
  		card.find(".watchers_count").text(repo.watchers_count)
  		addContributors(repo, card);
  		card.removeClass("hide repoCard");
  		return card;
  	},
  		addContributors = function(repo, card) {
  			$.get(repo.contributors_url, {"access_token" : "c1ed8f00d37bcd5b91fb80b07dc149b10f5f7e35"}, function(people) {
  				people = people || [];
  				people.sort(function(a,b) {return b.concontributions - a.concontributions;})
  				.forEach(function(person,index){
  					card.find(".contributors").append(
  						'<div class="chip">' +
            			'<img src="'+person.avatar_url +
            			'" alt="Contact Person">' + person.login +
       					'</div>'
       				);
  				});
  			});
  			
	},
		populateRepositoryTab = function(repoName, tabId) {
			$.get("//api.github.com/users/"+ repoName + "/repos", 
				{"access_token" : "c1ed8f00d37bcd5b91fb80b07dc149b10f5f7e35"}, 
				function(repos) {
		    	repos.sort(function(repo1, repo2) {
		    		return repo2.stargazers_count - repo1.stargazers_count;
		    	}).forEach(function(repo,index){
		    		$("#" + tabId + " .repositories"+ index % 3).append(createRepoCard(repo));
		    	});
		    });
	};

	$("#copyright").text(new Date().getFullYear());
    $('.button-collapse').sideNav();
    populateRepositoryTab("criteo", "user_criteo");
    //populateRepositoryTab("criteo-forks", "user_criteo_forks");
    populateRepositoryTab("criteo-cookbooks", "user_criteo_cookbooks");
  }); // end of document ready
})(jQuery); // end of jQuery name space