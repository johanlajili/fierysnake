ENGINE.InAppPurchase = function () {
	var that, gameCenter, socialService, isLoggedIn;
	that = this;
	working = CocoonJS.Store.nativeExtensionObjectAvailable;
	that.listeners = [];
	that.productPurchaseCompleted = function (productId) {
		that.listeners.forEach(function (listener) {
			if (listener.id == productId) {
				listener.fn();
			}
		})
	}
	that.onItemIsPurchased = function (productId, fn, failFn) {
		that.listeners.push({
			id: productId,
			fn: fn,
			failFn: failFn
		});
	}
	if (working) {
		var a = null;
		CocoonJS.Store.onProductsFetchStarted.addEventListener(function () {
			console.log("onProductsFetchStarted");
		});

		CocoonJS.Store.onProductsFetchFailed.addEventListener(function () {
			console.log("onProductsFetchFailed");
		});

		CocoonJS.Store.onProductsFetchCompleted.addEventListener(function (products) {
			for (var i = products.length - 1; i >= 0; i--) {
				CocoonJS.Store.addProduct(products[i]);
				console.log("Adding product to the local database: " + JSON.stringify(products[i]));
			};

			console.log("onProductsFetchCompleted: " + JSON.stringify(products));
		});
		/**********************************
		 * Product purchase
		 *******************************/
		CocoonJS.Store.onProductPurchaseStarted.addEventListener(function (productId) {
			console.log("onProductPurchaseStarted");
			console.log(JSON.stringify(arguments));
		});
		CocoonJS.Store.onProductPurchaseFailed.addEventListener(function (productId, err) {
			console.log("onProductPurchaseFailed");
			that.listeners.forEach(function (listener) {
				listener.failFn();
			})
			CocoonJS.Store.restorePurchases();
			console.log(JSON.stringify(arguments));
		});
		CocoonJS.Store.onProductPurchaseCompleted.addEventListener(function (purchaseInfo) {
			console.log("onProductPurchaseCompleted");
			console.log(JSON.stringify(arguments));
			CocoonJS.Store.consumePurchase(purchaseInfo.transactionId, purchaseInfo.productId);
			CocoonJS.Store.finishPurchase(purchaseInfo.transactionId);
			CocoonJS.Store.addPurchase(purchaseInfo)
			that.productPurchaseCompleted(purchaseInfo.productId);
		});
		/**********************************	
		 * Consume purchase mode
		 *******************************/
		CocoonJS.Store.onConsumePurchaseStarted.addEventListener(function (transactionId) {
			console.log("onConsumePurchaseStarted");
			console.log(JSON.stringify(arguments));
		});
		CocoonJS.Store.onConsumePurchaseCompleted.addEventListener(function (transactionId) {
			console.log("onConsumePurchaseCompleted");
			console.log(JSON.stringify(arguments));
		});
		CocoonJS.Store.onConsumePurchaseFailed.addEventListener(function (transactionId, err) {
			console.log("onConsumePurchaseFailed");
			console.log(JSON.stringify(arguments));
		});
		/**********************************
		 * Restore purchases mode
		 *******************************/
		CocoonJS.Store.onRestorePurchasesStarted.addEventListener(function () {
			console.log("onRestorePurchasesStarted");
		});
		CocoonJS.Store.onRestorePurchasesFailed.addEventListener(function (errorMessage) {
			console.log("onRestorePurchasesFailed");
			console.log(errorMessage);
		});
		CocoonJS.Store.onRestorePurchasesCompleted.addEventListener(function () {
			console.log("onRestorePurchasesCompleted");
			console.log(CocoonJS.Store.getPurchases())
		});
		/**********************************
		 * THIS IS ONLY USED IN UNMANAGED MODE
		 *******************************/
		CocoonJS.Store.onProductPurchaseVerificationRequestReceived.addEventListener(function (productId, data) {
			/*console.log("onProductPurchaseVerificationRequestReceived");
	 		var purchaseToken = JSON.parse(data).signedData.purchaseToken;
			console.log("********************************************");
			console.log("CURRENT PRODUCTS ON LOCAL DATABASE:\n\n\n\n\n\n");
			console.log(JSON.stringify(CocoonJS.Store.getProducts()));
			console.log("********************************************");
			CocoonJS.Store.consumePurchase(purchaseToken, productId);
			console.log("======= purchaseToken : " + purchaseToken + "productId  " + productId + " consumed =========");
			CocoonJS.Store.finishPurchase(purchaseToken);
			console.log("======= purchase finished ===========");*/
			// Add here all the stuff you need for verify the purchase.
		});
		CocoonJS.Store.requestInitialization({
			managed: true,
			sandbox: false
		})
		CocoonJS.Store.start()
	}
	that.buy = function (productId) {
		console.log("buy")
		if (working && CocoonJS.Store.canPurchase()) {
			CocoonJS.Store.purchaseProduct(productId);
		}
	}
}





//
//(function(){
//
//	/**********************************
//	 * Fetch products from server
// 	 *******************************/
//
//	
//
// 	 /**********************************
//	 * START THE DEMO
// 	 *******************************/
//
// 	CocoonJS.Store.requestInitialization({ 
//		sandbox: false,
//		managed: true
//	});
//	
//	CocoonJS.Store.start();
//	
//	document.body.addEventListener("click", function(evt){
//		CocoonJS.App.onTextDialogFinished.addEventListener(function(productId){
//			a = productId;
//			
//		});
//		
//	});
//
//	var canvas = document.createElement("canvas");
//	canvas.width = 480;
//	canvas.height = 360;
//	canvas.style.cssText="idtkscale:ScaleToFill;";
//	var ctx = canvas.getContext("2d");
//
//
//	var img = document.createElement("img");
//	img.onload = function(e){
//		ctx.drawImage(e.target, 0,0);
//	}
//
//	img.src= "background.jpg";
//
//	canvas.addEventListener("click", function(e){
//		x = e.clientX;
//		y = e.clientY;
//
//		if  (x >= 64 && x <= 373 && y >= 63 && y <= 87){
//			console.log("Fetch product from store");
//			CocoonJS.App.showTextDialog( "Product id", "fetchProductsFromStore", "remove.ads", CocoonJS.App.KeyboardType.TEXT,"Cancel","Ok");
//		}else if  (x >= 107 && x <= 365 && y >= 171 && y <= 193){
//			console.log("Purchase product");
//			CocoonJS.Store.purchaseProduct(a);
//		}else if (x >= 97 && x <= 376 && y >= 269 && y <= 289){
//			console.log("Restore purchases");
//			CocoonJS.Store.restorePurchases();
//		}
//		
//	});
//	document.body.appendChild(canvas);
//})();