var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector(
	'#close-create-post-modal-btn'
);
var sharedMomentsArea = document.querySelector('#shared-moments');

// Function called when user taps on add button, a place to potentially show `Add to Homescreen`
function openCreatePostModal() {
	createPostArea.style.display = 'block';
	if (deferredPrompt) {
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then(choice => {
			console.log(choice.outcome);
			choice.outcome === 'dismissed'
				? console.log('User denied Add2H')
				: console.log('Added to Homescreen!');
		});
		// Set to null as we only get one chance
		deferredPrompt = null;
	}
}

function closeCreatePostModal() {
	createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// Create a card that uses material methods
function createCard() {
	var cardWrapper = document.createElement('div');
	cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
	var cardTitle = document.createElement('div');
	cardTitle.className = 'mdl-card__title';
	cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
	cardTitle.style.backgroundSize = 'cover';
	cardTitle.style.height = '180px';
	cardWrapper.appendChild(cardTitle);
	var cardTitleTextElement = document.createElement('h2');
	cardTitleTextElement.className = 'mdl-card__title-text';
	cardTitleTextElement.textContent = 'San Francisco Trip';
	cardTitle.appendChild(cardTitleTextElement);
	var cardSupportingText = document.createElement('div');
	cardSupportingText.className = 'mdl-card__supporting-text';
	cardSupportingText.textContent = 'In San Francisco';
	cardSupportingText.style.textAlign = 'center';
	cardWrapper.appendChild(cardSupportingText);
	componentHandler.upgradeElement(cardWrapper);
	sharedMomentsArea.appendChild(cardWrapper);
}

// simulate a required network request but just calles create card upon successful request to test func if offline
fetch('https://httpbin.org/get')
	.then(function(res) {
		return res.json();
	})
	.then(function(data) {
		createCard();
	});
