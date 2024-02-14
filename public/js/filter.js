const selectElement = document.getElementById('mySelect');
const formContainer = document.getElementById('filter-form-container1');

selectElement.addEventListener('change', (event) => {
  const selectedValue = event.target.value;

  //hidden input field in form section
  if (document.getElementById('selectedValue')) {
    document.getElementById('selectedValue').value = selectedValue;
  } else {
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.id = 'selectedValue';
    hiddenInput.name = 'selectedValue';
    formContainer.insertBefore(hiddenInput, formContainer.firstChild);
    hiddenInput.value = selectedValue;
  }
  if (selectedValue === 'Office-Furniture') {
    formContainer.innerHTML = `
        <div class="filter1">
          <h5 class="filter-heading1">Category</h5>
          <div class="lower-filter1">
          <input type="checkbox" name="category" id="cat-1" value="chair">
          <label for="cat-1">Office Chairs</label>
          </div>
          <div class="lower-filter1">
          <input type="checkbox" name="category" id="cat-2" value="desks">
          <label for="cat-2">Desks</label>
          </div>
          <div class="lower-filter1">
          <input type="checkbox" name="category" id="cat-3" value="stools">
          <label for="cat-3">Stools</label>
          </div>
          <div class="lower-filter1">
          <input type="checkbox" name="category" id="cat-4" value="executive chair">
          <label for="cat-4">Executive Chairs</label>
          </div>
          <div class="lower-filter1">
          <input type="checkbox" name="category" id="cat-5" value="storage units">
          <label for="cat-5">Storage Units</label>
          </div>
          <div class="lower-filter1">
          <input type="checkbox" name="category" id="cat-6" value="workstation">
          <label for="cat-6">Workstations</label>
          </div>
        </div>

        <div class="filter1">
         <h5 class="filter-heading1">Collections</h5>
         <div class="lower-filter1">
         <input type="checkbox" id="coll-1" name="myCollection" value="Tiramoli">
         <label for="coll-1">Tiramoli</label>
         </div>
         <div class="lower-filter1">
         <input type="checkbox" id="coll-2" name="myCollection" value="Anthony">
         <label for="coll-2">Anthony</label>
         </div>
         <div class="lower-filter1">
         <input type="checkbox" id="coll-3" name="myCollection" value="Tiramolla">
         <label for="coll-3">Tiramolla</label>
         </div>
        </div>
        
        <div class="filter1">
         <h5 class="filter-heading1">Price</h5>
         <div class="lower-filter1">
         <input type="checkbox" name="high" id="price-1">
         <label for="price-1">High to Low</label>
         </div>
         <div class="lower-filter1">
         <input type="checkbox" name="low" id="price-2">
         <label for="price-2">Low to High</label>
         </div>
        </div>    

        <div class="filter1">
         <button class="btn1 edit-btn1" type="submit">Apply Filter</button>
        </div>
            
        `;
  } else if (selectedValue === 'Hotel-Furniture') {
    formContainer.innerHTML = `
    <div class="filter1">
    <h5 class="filter-heading1">Category</h5>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-1" value="Bedrooms">
    <label for="cat-1">Bedrooms</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-2" value="Monoblock Kitchen">
    <label for="cat-2">Monoblock Kitchen</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-3" value="wardrobes">
    <label for="cat-3">Wardrobes</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-4" value="desks">
    <label for="cat-4">Desks</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-5" value="sofas">
    <label for="cat-5">Sofa</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-6" value="headboards">
    <label for="cat-6">Headboards</label>
    </div>
  </div>

  <div class="filter1">
   <h5 class="filter-heading1">Collections</h5>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-1" name="myCollection" value="Tiramoli">
   <label for="coll-1">Tiramoli</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-2" name="myCollection" value="Sameer">
   <label for="coll-2">Sameer</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-3" name="myCollection" value="Saif">
   <label for="coll-3">Saif</label>
   </div>
  </div>
  
  <div class="filter1">
   <h5 class="filter-heading1">Price</h5>
   <div class="lower-filter1">
   <input type="checkbox" name="high" id="price-1">
   <label for="price-1">High to Low</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" name="low" id="price-2">
   <label for="price-2">Low to High</label>
   </div>
  </div>    
    
  <div class="filter1">
   <button class="btn1 edit-btn1" type="submit">Apply Filter</button>
  </div>
        `;
  } else if (selectedValue === 'Restaurant-Furniture') {
    formContainer.innerHTML = `
    <div class="filter1">
    <h5 class="filter-heading1">Category</h5>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-1" value="chair">
    <label for="cat-1">Chairs</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-2" value="tables">
    <label for="cat-2">Tables</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-3" value="Booths">
    <label for="cat-3">Booths</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-4" value="canteen tables">
    <label for="cat-4">Canteen Tables</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-5" value="storage units">
    <label for="cat-5">Storage Units</label>
    </div>
  </div>

  <div class="filter1">
   <h5 class="filter-heading1">Collections</h5>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-1" name="myCollection" value="Saif">
   <label for="coll-1">Saif</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll=2" name="myCollection" value="Anthony">
   <label for="coll-2">Anthony</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-3" name="myCollection" value="Tiramolla">
   <label for="coll-3">Tiramolla</label>
   </div>
  </div>
  
  <div class="filter1">
   <h5 class="filter-heading1">Price</h5>
   <div class="lower-filter1">
   <input type="checkbox" name="high" id="price-1">
   <label for="price-1">High to Low</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" name="low" id="price-2">
   <label for="price-2">Low to High</label>
   </div>
  </div>    
    
  <div class="filter1">
   <button class="btn1 edit-btn1" type="submit">Apply Filter</button>
  </div>
        `;
  } else if (selectedValue === 'Shop-Furniture') {
    formContainer.innerHTML = `
    <div class="filter1">
    <h5 class="filter-heading1">Category</h5>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-1" value="furnishing">
    <label for="cat-1">Furnishing</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-2" value="hairdresser chair">
    <label for="cat-2">Hairdresser Chairs</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-3" value="Display units">
    <label for="cat-3">Display Units</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-4" value="Display Cases">
    <label for="cat-4">Display Cases</label>
    </div>
  </div>

  <div class="filter1">
   <h5 class="filter-heading1">Collections</h5>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-1" name="myCollection" value="Manish">
   <label for="coll-1">Manish</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-2" name="myCollection" value="Ayesha">
   <label for="coll-2">Ayesha</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-3" name="myCollection" value="Ayush">
   <label for="coll-3">Ayush</label>
   </div>
  </div>
  
  <div class="filter1">
   <h5 class="filter-heading1">Price</h5>
   <div class="lower-filter1">
   <input type="checkbox" name="high" id="price-1">
   <label for="price-1">High to Low</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" name="low" id="price-2">
   <label for="price-2">Low to High</label>
   </div>
  </div>    
    
  <div class="filter1">
   <button class="btn1 edit-btn1" type="submit">Apply Filter</button>
  </div>
          `
  } else if (selectedValue === 'Kitchen-Furniture') {
    formContainer.innerHTML = `
    <div class="filter1">
    <h5 class="filter-heading1">Category</h5>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-1" value="Mini kitchen">
    <label for="cat-1">Mini Kitchen</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-2" value="kitchen">
    <label for="cat-2">Kitchen</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-3" value="Free standing unit">
    <label for="cat-3">Free Standing Units</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-4" value="worktops">
    <label for="cat-4">Worktops</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-5" value="Cookers">
    <label for="cat-5">Cookers</label>
    </div>
  </div>

  <div class="filter1">
   <h5 class="filter-heading1">Collections</h5>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-1" name="myCollection" value="Tiramoli">
   <label for="coll-1">Tiramoli</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-2" name="myCollection" value="Ayush">
   <label for="coll-2">Ayush</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-3" name="myCollection" value="Sameer">
   <label for="coll-3">Sameer</label>
   </div>
  </div>
  
  <div class="filter1">
   <h5 class="filter-heading1">Price</h5>
   <div class="lower-filter1">
   <input type="checkbox" name="high" id="price-1">
   <label for="price-1">High to Low</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" name="low" id="price-2">
   <label for="price-2">Low to High</label>
   </div>
  </div>    
    
  <div class="filter1">
   <button class="btn1 edit-btn1" type="submit">Apply Filter</button>
  </div>
          `
  } else if (selectedValue === 'Kids-Furniture') {
    formContainer.innerHTML = `
    <div class="filter1">
    <h5 class="filter-heading1">Category</h5>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-1" value="Bedrooms">
    <label for="cat-1">Bedrooms</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-2" value="sofas and armchair">
    <label for="cat-2">Sofas & Armchair</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-3" value="tables and chairs">
    <label for="cat-3">Tables & Chairs</label>
    </div>
  </div>

  <div class="filter1">
   <h5 class="filter-heading1">Collections</h5>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-1" name="myCollection" value="Saif">
   <label for="coll-1">Saif</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-2" name="myCollection" value="Anthony">
   <label for="coll-2">Anthony</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-3" name="myCollection" value="Tiramolla">
   <label for="coll-3">Tiramolla</label>
   </div>
  </div>
  
  <div class="filter1">
   <h5 class="filter-heading1">Price</h5>
   <div class="lower-filter1">
   <input type="checkbox" name="high" id="price-1">
   <label for="price-1">High to Low</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" name="low" id="price-2">
   <label for="price-2">Low to High</label>
   </div>
  </div>    
    
  <div class="filter1">
   <button class="btn1 edit-btn1" type="submit">Apply Filter</button>
  </div>
       `
  } else if (selectedValue === 'Outdoor-Furniture') {
    formContainer.innerHTML = `
    <div class="filter1">
    <h5 class="filter-heading1">Category</h5>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-1" value="armchair">
    <label for="cat-1">Armchairs</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-2" value="sofa">
    <label for="cat-2">Sofa</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-3" value="tables">
    <label for="cat-3">Tables</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-4" value="benches">
    <label for="cat-4">Benches</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-5" value="Daybeds">
    <label for="cat-5">Daybeds</label>
    </div>
    <div class="lower-filter1">
    <input type="checkbox" name="category" id="cat-6" value="low lounge chair">
    <label for="cat-6">Low Lounge Chairs</label>
    </div>
  </div>

  <div class="filter1">
   <h5 class="filter-heading1">Collections</h5>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-1" name="myCollection" value="Ayush">
   <label for="coll-1">Ayush</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-2" name="myCollection" value="Manish">
   <label for="coll-2">Manish</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" id="coll-3" name="myCollection" value="Sameer">
   <label for="coll-3">Sameer</label>
   </div>
  </div>
  
  <div class="filter1">
   <h5 class="filter-heading1">Price</h5>
   <div class="lower-filter1">
   <input type="checkbox" name="high" id="price-1">
   <label for="price-1">High to Low</label>
   </div>
   <div class="lower-filter1">
   <input type="checkbox" name="low" id="price-2">
   <label for="price-2">Low to High</label>
   </div>
  </div>    
    
  <div class="filter1">
   <button class="btn1 edit-btn1" type="submit">Apply Filter</button>
  </div>
  `
  }
  formContainer.style.display = 'block';
});
