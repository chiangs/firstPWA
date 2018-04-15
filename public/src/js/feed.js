var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector(
	'#close-create-post-modal-btn'
);

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
