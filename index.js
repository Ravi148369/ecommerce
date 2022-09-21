(function () {
    "use strict"
    let product = ''
    async function getProducts() {
        product = await fetch('./Products.json').then(value => value.json())
        const products = {
            body: document.querySelector('#main'),
            getElement: function (element, count = 1) {
                const elements = []
                for (let i = 0; i < count; i++) {
                    elements.push(document.createElement(element))
                }
                return elements
            },
            render: function (index = 0) {
                if(this.body){
                    this.body.innerHTML = ''
                    this.header()
                    this.productSection(product.product[index],index)
                    this.profile()
                    this.similarItemSection(product.product)
                    this.footer()
                    this.baseFooter()
                }
            },
            header: function () {
                const [header] = this.getElement('header')
                const [select] = this.getElement('select')
                const [option] = this.getElement('option')
                const [input] = this.getElement('input', 1)
                const [productList, inputDiv, sellingDiv, alignDiv, searchDropDown] = this.getElement('div', 5)

                searchDropDown.classList.add('dropdown')
                document.addEventListener('click', (e) => {
                    if (!searchDropDown.contains(e.target)) {
                        searchDropDown.style.display = 'none'
                        input.value = ''
                    }
                })
                sellingDiv.textContent = "Start Selling Now"
                sellingDiv.classList.add('selling-div')
                inputDiv.classList.add('input-div')
                input.placeholder = 'Search Item, Zip code....'
                option.textContent = 'All Product'
                alignDiv.classList.add('flex-space-between')
                input.addEventListener('keyup', (e) => {
                    searchDropDown.innerHTML = ''
                    product.product.map((value, index) => {
                        if (e.target.value.trim() !== '') {
                            searchDropDown.style.display = 'block'
                            if (value.title.toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                                const [item] = this.getElement('div')
                                const [title] = this.getElement('p')
                                const [img] = this.getElement('img')
                                
                                item.classList.add('dropdown-item')
                                img.src = `./images/${value.imageSrc.image1}`
                                title.textContent = value.title
                                item.append(img, title)
                                item.addEventListener('click', () => {
                                    this.render(index)
                                })
                                searchDropDown.append(item)
                            }
                        }
                    })
                })
                select.append(option)
                inputDiv.append(select, input)
                productList.append(inputDiv, searchDropDown)
                alignDiv.append(productList, sellingDiv)
                header.append(alignDiv)
                this.body.append(header)
            },
            productSection: function (product,index) {
                const [main, section] = this.getElement('section', 2)
                main.classList.add('align','margintop')
                section.classList.add('product-section')
                const imageSection = this.productImageSection(product)
                const productDetailSection = this.productDetailSection(product,index)
                section.append(imageSection, productDetailSection)
                main.append(section)
                this.body.append(main)
            },
            productImageSection: function (product) {
                const [main] = this.getElement('section')
                const [imageSection] = this.getElement('section')
                const [imgDiv, sideImageDiv1, sideImageDiv2, sideImageDiv3, mainImageDiv] = this.getElement('div', 5)
                const [img1, img2, img3, mainImg] = this.getElement('img', 4)

                imgDiv.classList.add('image-div')
                mainImg.src = `./images/${product.imageSrc.main}`
                img1.src = `./images/${product.imageSrc.image1}`
                img2.src = `./images/${product.imageSrc.image2}`
                img3.src = `./images/${product.imageSrc.image3}`
                mainImg.alt = 'not found'
                img1.alt = "not found"
                img2.alt = 'not found'
                img3.alt = 'not found'

                const getModel=(e)=>{
                    this.openModel(e.target.src)
                }
                img1.addEventListener('click',getModel)
                img2.addEventListener('click',getModel)
                img3.addEventListener('click',getModel)
                mainImg.addEventListener('click',getModel)
                mainImageDiv.append(mainImg)
                sideImageDiv1.append(img1)
                sideImageDiv2.append(img2)
                sideImageDiv3.append(img3)
                imgDiv.append(sideImageDiv1, sideImageDiv2, sideImageDiv3, mainImageDiv)
                imageSection.append(imgDiv)
                main.append(imageSection)
                return main
            },
            productDetailSection: function (product, index) {
                const [infoDiv, radioButtonDiv, alignDiv, deliveryDiv, quantityDiv, deliveryDays] = this.getElement('div', 6)
                const [title] = this.getElement('h2')
                const [prize] = this.getElement('h3')
                const [location, views, productInfo, color, delivery, quantity, deliveryCharges, deliveryLocation, quantityText, deliveryText] = this.getElement('p', 12)
                const [storePickupLabel, deliveryLabel] = this.getElement('label', 2)
                const [decreaseIcon, increaseIcon] = this.getElement('i', 2)
                const [storePickupRadioButton, deliveryRadioButton] = this.getElement('input', 2)
                const FormDiv = this.makeOfferForm(product, index)
                radioButtonDiv.classList.add('color-radioButton')
                product.color.map((value,index)=>{
                    const [radioInput] = this.getElement('input')
                    const [label]=this.getElement('label')
                    label.setAttribute('for',`color${index}`)
                    label.style.backgroundColor=value.value
                    radioInput.setAttribute('type', 'radio');
                    radioInput.setAttribute('name', 'color');
                    radioInput.setAttribute('value', value.name);
                    radioInput.id=`color${index}`
                    radioInput.addEventListener('click', function () {
                        radioInput.style.accentColor = value.value
                        color.textContent = `Color : ${radioInput.value}`
                    })
                    radioButtonDiv.append(radioInput,label)
                })
                quantityDiv.classList.add('quantity-icons')
                alignDiv.classList.add('space-between')
                infoDiv.classList.add('product-div')
                deliveryDiv.classList.add('delivery-div')
                quantityText.classList.add('grey-txt')
                deliveryText.classList.add('grey-txt')
                location.classList.add('grey-txt')
                views.classList.add('grey-txt')
                quantityText.textContent = 'Quantity'
                deliveryText.textContent = 'Delivery'
                title.textContent = product.title
                location.textContent = product.location
                productInfo.textContent = product.information
                prize.textContent = `$${product.prize}`
                views.textContent = `${product.viewed} Viewed`
                color.textContent = `Color : ${product.color[0].name}`
                delivery.textContent = 'Delivery'
                storePickupLabel.textContent = 'Store Pickup'
                deliveryLabel.textContent = 'Delivery'
                storePickupLabel.setAttribute('for', 'store-pick')
                deliveryLabel.setAttribute('for', 'delivery-door')
                storePickupRadioButton.id = 'store-pick'
                deliveryRadioButton.id = 'delivery-door'
                storePickupRadioButton.value = 'Store Pickup'
                deliveryRadioButton.value = "Delivery"
                storePickupRadioButton.type = 'radio'
                deliveryRadioButton.type = 'radio'
                deliveryRadioButton.type = 'radio'
                deliveryRadioButton.name = 'pickupvalue'
                storePickupRadioButton.name = 'pickupvalue'
                increaseIcon.classList.add('fa', 'fa-plus')
                quantity.textContent = product.quantity
                decreaseIcon.classList.add('fa', 'fa-minus')
                decreaseIcon.addEventListener('click', function () {
                    if (product.quantity != 0) {
                        quantity.textContent = --product.quantity
                    }
                    else {
                        quantity.style.color = 'grey'
                    }
                })
                increaseIcon.addEventListener('click', function () {
                    if (product.quantity == 0) {
                        quantity.style.color = 'black'
                    }
                    quantity.textContent = ++product.quantity
                })
                quantity.addEventListener('click', function () {
                    quantity.style.color = 'grey'
                    product.quantity = 0
                    quantity.textContent = product.quantity
                })
                deliveryCharges.textContent = `Delivery : $${product.deliveryCharges} (2-3 business days, $${product.deliveryCharges} shipping)`
                deliveryLocation.textContent = `to Newyork, NY`

                deliveryDays.append(deliveryCharges, deliveryLocation)
                quantityDiv.append(decreaseIcon, quantity, increaseIcon)
                deliveryDiv.append(storePickupRadioButton, storePickupLabel, deliveryRadioButton, deliveryLabel)
                alignDiv.append(location, views)
                infoDiv.append(title, alignDiv, productInfo, prize, color, radioButtonDiv, deliveryText, deliveryDiv, quantityText, quantityDiv, deliveryDays, FormDiv)
                return infoDiv
            },
            makeOfferForm: function (product,index) {
                const [offerFormDiv, FormDiv, buttonDiv, closeDiv, deliveryDiv, paymentDiv] = this.getElement('div', 7)
                const [buyNowButton, makeOfferButton, submitButton] = this.getElement('button', 3)
                const [offerInput, locationInput, radioPickupButton, radioDeliveryButton, radioOnlineButton, radioOfflineButton] = this.getElement('input', 6)
                const [offerP, deliveryText, locationText, deliveryCharges, paymentText] = this.getElement('p', 5)
                const [pickupButton, deliveryButton, onlineLabel, offlineLabel,] = this.getElement('label', 4)
                const [cutIcon] = this.getElement('i')
                const [offerForm] = this.getElement('form')

                offerForm.classList.add('form')
                deliveryDiv.classList.add('delivery-pickup')
                paymentDiv.classList.add('delivery-pickup')
                FormDiv.classList.add('offer-form')
                closeDiv.classList.add('close-offer-div')
                buttonDiv.classList.add('offer-button')
                deliveryText.classList.add('grey-txt', 'mbottom')
                locationText.classList.add('grey-txt', 'margintop')
                paymentText.classList.add('grey-txt', 'payment-text', 'mbottom')
                buyNowButton.textContent = 'Buy Now'
                makeOfferButton.textContent = 'Make an Offer'
                offerP.textContent = "Make Offer"
                cutIcon.classList.add('fa', 'fa-times')
                offerInput.placeholder = 'Enter your offer'
                locationInput.placeholder = "Enter your location"
                deliveryText.textContent = "Delivery"
                pickupButton.setAttribute('for', "store")
                pickupButton.textContent = 'Store Pickup'
                deliveryButton.setAttribute("for", 'delivery')
                deliveryButton.textContent = 'Delivery'
                radioDeliveryButton.type = 'radio'
                radioDeliveryButton.value = 'Delivery'
                radioDeliveryButton.id = 'delivery'
                radioPickupButton.type = 'radio'
                radioPickupButton.value = 'Store pickup'
                radioDeliveryButton.name = 'pickup'
                radioPickupButton.name = 'pickup'
                radioPickupButton.id = 'store'
                locationText.textContent = 'Delivery to'
                deliveryCharges.textContent = `Delivery : $40 (2-3 business days, $40 shipping)`
                paymentText.textContent = 'Payment'
                onlineLabel.textContent = 'Online'
                offlineLabel.textContent = "Pay in Person"
                onlineLabel.setAttribute('for', 'online')
                offlineLabel.setAttribute('for', 'offline')
                radioOfflineButton.type = 'radio'
                radioOfflineButton.id = 'offline'
                radioOfflineButton.name = 'payment'
                radioOfflineButton.value = 'Offline'
                radioOnlineButton.type = 'radio'
                radioOnlineButton.id = 'online'
                radioOnlineButton.name = 'payment'
                radioOnlineButton.value = 'Online'
                makeOfferButton.addEventListener('click', function () {
                    FormDiv.style.display = 'block'
                })
                cutIcon.addEventListener('click', function () {
                    FormDiv.style.display = 'none'
                })
                if (product.Bought) {
                    buyNowButton.style.backgroundColor = 'grey'
                    buyNowButton.style.cursor = 'not-allowed'
                    buyNowButton.disabled = true
                }
                buyNowButton.addEventListener('click', () => {
                    if (!product.Bought) {
                        product.Bought = 'true'
                        this.render(index)
                    }
                })
                submitButton.classList.add('submit-button')
                submitButton.textContent = 'Submit Offer'
                submitButton.addEventListener('click', function (e) {
                    e.preventDefault()
                    if (offerInput.value.trim() !== '' && locationInput.value.trim() !== '') {
                        alert('offer submitted')
                    }
                })
                paymentDiv.append(radioOnlineButton, onlineLabel, radioOfflineButton, offlineLabel)
                deliveryDiv.append(radioPickupButton, pickupButton, radioDeliveryButton, deliveryButton)
                offerForm.append(offerInput, deliveryText, deliveryDiv, locationText, locationInput, deliveryCharges, paymentText, paymentDiv, submitButton)
                closeDiv.append(offerP, cutIcon)
                FormDiv.append(closeDiv, offerForm)
                buttonDiv.append(buyNowButton, makeOfferButton)
                offerFormDiv.append(buttonDiv, FormDiv)
                return offerFormDiv
            },
            similarItemSection: function (items) {
                const [main, section] = this.getElement('section', 2)
                main.classList.add('align-center')
                section.classList.add('align')
                const [similarItemText] = this.getElement('h3')
                similarItemText.textContent = "Similar Items"
                similarItemText.classList.add('align-right')
                items.map((item, index) => {
                    main.append(this.similarItem(item, index))
                })
                section.append(main)
                this.body.append(similarItemText, section)
            },
            similarItem: function (item, index) {
                const [itemDiv, imageDiv, productDiv] = this.getElement('div', 3)
                const [image] = this.getElement('img')
                const [productTitle, viewed, prize] = this.getElement('p', 3)

                imageDiv.classList.add('similar-image-div')
                productDiv.classList.add('similar-product')
                itemDiv.classList.add('similar-product-section')
                image.src = `./images/${item.imageSrc.image1}`
                productTitle.textContent = `${item.title}`
                viewed.textContent = `${item.viewed} viewed`
                prize.textContent = `$${item.prize}`
                itemDiv.addEventListener('click', () => {
                    this.render(index)
                })
                imageDiv.append(image)
                productDiv.append(imageDiv, productTitle, viewed, prize)
                itemDiv.append(productDiv)
                return itemDiv
            },
            footer: function () {
                const [footer] = this.getElement('footer')
                const [main, alignRight, flexbox] = this.getElement('section', 3)
                const [deliveryDiv, shoppingLinks, linkFlexBox, usefulLinks] = this.getElement('div', 4)

                footer.classList.add('footer-align')
                alignRight.classList.add('justify-align-right')
                main.classList.add('justify-align-center')
                flexbox.classList.add('flex-box')
                linkFlexBox.classList.add("link-flexBox")

                deliveryDiv.append(this.getFooterItem("local_shipping", "Fast & Free delivery", "Free delivery for all orders over $200"))
                deliveryDiv.append(this.getFooterItem("	account_balance_wallet", "Money back gurantee", "we return money within 30 days"))
                deliveryDiv.append(this.getFooterItem("local_shipping", "Fast & Free delivery", "Free delivery for all orders over $200"))
                shoppingLinks.append(this.footerShoppingLinks("Online Shopping", "Electronics", "Vacancies", "Real State", "Vehicles", "Other Services", "Free Stuffs"))
                usefulLinks.append(this.footerShoppingLinks("Useful Links", "Home", "About Us", "Terms and Conditions", "FAQ", "Privacy Policies", "SADSDS", "Shipping & Returns", "Contact Us"))
                linkFlexBox.append(deliveryDiv, shoppingLinks, usefulLinks)
                alignRight.append(linkFlexBox)
                main.append(alignRight)
                footer.append(main)
                this.body.append(footer)
            },
            getFooterItem: function (icon, heading, subHeading) {
                const [item, iconItem, textIcon] = this.getElement('div', 3)
                const [headingP, subHeadingP] = this.getElement('p', 2)
                const [shippingIcon] = this.getElement('i')

                item.classList.add('flexBox')
                shippingIcon.classList.add('material-icons', "footerIcons")
                shippingIcon.textContent = icon
                headingP.textContent = heading
                subHeadingP.textContent = subHeading

                iconItem.append(shippingIcon)
                textIcon.append(headingP, subHeadingP)
                item.append(iconItem, textIcon)
                return item
            },
            footerShoppingLinks: function () {
                const [shoppinigTitle] = this.getElement('h3')
                const [main] = this.getElement('section')
                main.classList.add('flex-direction')
                shoppinigTitle.textContent = arguments[0]
                main.append(shoppinigTitle)
                for (let i = 1; i < arguments.length; i++) {
                    const [link] = this.getElement('a')
                    link.textContent = arguments[i]
                    main.append(link)
                }
                return main
            },
            baseFooter: function () {
                const [main, align] = this.getElement('section', 2)
                const [copyrightDiv, iconDiv] = this.getElement('div', 2)
                const icons = ["fab fa-facebook", "fab fa-twitter", "fab fa-linkedin", "fab fa-instagram", "fab fa-github"]
                icons.map(icon => {
                    const [i] = this.getElement('i')
                    const iconClass = icon.split(' ')
                    i.classList.add(iconClass[0], iconClass[1])
                    iconDiv.append(i)
                })
                main.classList.add('footer-align')
                align.classList.add('footer-align-center')
                iconDiv.classList.add('logo-icon')
                copyrightDiv.textContent = 'silos.com copyright 2021, All right reserved'
                align.append(copyrightDiv, iconDiv)
                main.append(align)
                this.body.append(main)
            },
            profile: function () {
                const [main, align] = this.getElement('section', 2)
                const [profileDiv, saleDiv, contactDiv, linkDiv, profileSection] = this.getElement('div', 5)
                const [aboutProduct, sellerDetails] = this.getElement('h3', 2)
                linkDiv.classList.add('profile-flexbox')
                const [img] = this.getElement('img')
                align.classList.add('profile-align')
                main.classList.add('align')
                profileSection.classList.add('profile-section')
                aboutProduct.textContent = 'About the product'
                sellerDetails.textContent = 'Seller details'
                img.src = './images/rectangle.jpg'
                profileSection.append(profileDiv, saleDiv, contactDiv)
                linkDiv.append(aboutProduct, sellerDetails)
                align.append(linkDiv, profileSection)
                main.append(align)
                this.body.append(main)
            },
            openModel:function (targetImageSrc) {
                const [outerModel]=this.getElement('section')
                const [innerImage]=this.getElement('img')
                const [imageDiv]=this.getElement('div')

                outerModel.classList.add("outer-model")
                innerImage.src=targetImageSrc
                
                function animation (zoom, x = 0) {
                    if (x < zoom) {
                        x += 0.10
                        imageDiv.style.transform = `scale(${x})`
                        setTimeout(() => {
                            animation(zoom, x)
                        }, 5);
                    }
                }
                outerModel.addEventListener('click',(e)=>{
                    if(e.target==outerModel){
                        outerModel.style.display='none'
                    }
                })
                
                animation(1.1)
                imageDiv.append(innerImage)
                outerModel.append(imageDiv)
                this.body.append(outerModel)
            }
        }
        products.render()
    }
    getProducts()
})()