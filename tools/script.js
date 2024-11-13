// Define các biến của Nhập
let type_nhap = ''
let sku_name_nhap = ''
let part_number_nhap = ''
let unit_nhap = ''
let price_mml_nhap = ''
let vendor_id_nhap = ''
let vendor_id_nhap2 = ''
let vendor_name_nhap = ''
let expiry_date_nhap = '-'

let wh_xuat = ''
let type_xuat = ''
let sku_id_xuat = ''
let loc_xuat = ''
let expiry_date_xuat = ''
let inbound_date_xuat = ''
let price_inbound_xuat = ''
let qty_ib_xuat = ''
let qty_first_xuat = ''
let qty_ob_xuat = ''
let qty_last_xuat = ''
let sku_name_xuat = ''
let price_xuat = ''
let amount_xuat = ''
let unit_xuat = ''

function alert(text_want_to_alert) {
    const audio = new Audio('material/error.mp3'); // Replace with your sound file path
    audio.play();
    Swal.fire({
        // title: 'Cảnh báo!',
        text: text_want_to_alert,
        icon: 'error', // Use 'success' or 'error' as needed
        showConfirmButton: false, // Hide the confirm button
        timer: 4000, // Auto-close after 5 seconds
        timerProgressBar: true, // Show a progress bar indicating time remaining
        position: 'top', // Position it as in the example image
        toast: true, // Display as a toast-style alert
        background: 'red',
        color: 'white'
    });
}


function info(text_want_to_alert) {
    const audio = new Audio('material/success.mp3'); // Replace with your sound file path
    audio.play();
    Swal.fire({
        // title: 'Thông báo!',
        text: text_want_to_alert,
        icon: 'success', // Use 'success' or 'error' as needed
        showConfirmButton: false, // Hide the confirm button
        timer: 4000, // Auto-close after 5 seconds
        timerProgressBar: true, // Show a progress bar indicating time remaining
        position: 'top', // Position it as in the example image
        toast: true, // Display as a toast-style alert
        background: 'green',
        color: 'white'
    });
}


// Khởi tạo danh sách kho
function initializeWarehouseOptions() {
    document.getElementById("welcome").textContent = "Xin chào " + sessionStorage.getItem("fullname")
    const wh = sessionStorage.getItem("wh"); // Lấy giá trị "wh" từ sessionStorage
    const warehouseSelect = document.getElementById("warehouse");

    if (!warehouseSelect) {
        console.error("Không tìm thấy combobox 'warehouse'");
        return;
    }

    // Xóa tất cả các option hiện có trong combobox để làm mới
    warehouseSelect.innerHTML = '';

    // Thêm option trống ở đầu danh sách
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Chọn chi nhánh";
    emptyOption.disabled = true; // Không cho phép chọn lại option trống
    emptyOption.selected = true; // Đặt làm option mặc định được chọn
    warehouseSelect.appendChild(emptyOption);

    // Xác định danh sách các kho dựa trên giá trị của `wh`
    let options;
    if (wh === "All") {
        options = ['HCM', 'QN', 'BN'];
    } else if (wh) {
        options = [wh];
    } else {
        options = [];
        console.warn("Danh sách kho trống.");
    }

    // Thêm các option vào combobox "Chọn kho"
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        warehouseSelect.appendChild(opt);
    });
}

function initializeWarehouseOptions2() {
    const wh = sessionStorage.getItem("wh"); // Lấy giá trị "wh" từ sessionStorage
    const warehouseSelect = document.getElementById("warehouse_xuat");

    if (!warehouseSelect) {
        console.error("Không tìm thấy combobox 'warehouse'");
        return;
    }

    // Xóa tất cả các option hiện có trong combobox để làm mới
    warehouseSelect.innerHTML = '';

    // Thêm option trống ở đầu danh sách
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Chọn chi nhánh";
    emptyOption.disabled = true; // Không cho phép chọn lại option trống
    emptyOption.selected = true; // Đặt làm option mặc định được chọn
    warehouseSelect.appendChild(emptyOption);

    // Xác định danh sách các kho dựa trên giá trị của `wh`
    let options;
    if (wh === "All") {
        options = ['HCM', 'QN', 'BN'];
    } else if (wh) {
        options = [wh];
    } else {
        options = [];
        console.warn("Danh sách kho trống.");
    }

    // Thêm các option vào combobox "Chọn kho"
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        warehouseSelect.appendChild(opt);
    });
}

initializeWarehouseOptions();
initializeWarehouseOptions2()

// Hàm debounce để giới hạn số lần gọi tìm kiếm
function debounce(func, delay) {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Xử lý tìm kiếm "Loại vật tư"
function handleMaterialTypeInput(event) {
    const searchTerm = removeAccents(event.target.value).toUpperCase(); // Chuyển đổi thành uppercase không dấu
    const results = mml_data.filter(item => removeAccents(item[0]).toUpperCase().includes(searchTerm)); // Tìm kiếm không dấu

    // Hiển thị kết quả tìm kiếm từ cột mml_data[1]
    if (results.length > 0) {
        showSearchResults(results.map(item => item[0]), results); // Truyền danh sách tên vật tư và dữ liệu gốc
    } else {
        hideDropdown(); // Ẩn dropdown nếu không có kết quả
        console.log("Không tìm thấy kết quả.");
    }
}

// Hàm hiển thị kết quả tìm kiếm trong dropdown
function showSearchResults(displayList, fullData) {
    console.table(fullData)
    const dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = ''; // Xóa nội dung cũ

    // Hiển thị dropdown
    dropdown.style.display = 'block';

    // Sử dụng Set để giữ lại các giá trị duy nhất
    const uniqueItems = [...new Set(displayList)];

    // Tạo các mục dropdown từ danh sách uniqueItems
    uniqueItems.forEach((item, index) => {
        const dropdownItem = document.createElement("div");
        dropdownItem.classList.add("dropdown-item");
        dropdownItem.textContent = item;

        // Lấy chỉ số của phần tử đầu tiên trong fullData tương ứng với item
        const originalIndex = fullData.findIndex(dataItem => dataItem[0] === item);
        
        // Xử lý sự kiện khi người dùng chọn một mục từ dropdown
        dropdownItem.addEventListener("click", () => {
            document.getElementById("material-type").value = item; // Gán lựa chọn vào ô nhập liệu
            dropdown.style.display = 'none'; // Ẩn dropdown sau khi chọn

            // Gọi hàm để xử lý lựa chọn đầu tiên và tìm danh sách thứ hai
            showSecondaryOptions(fullData[originalIndex]);
        });

        dropdown.appendChild(dropdownItem);
    });
}

/// Hàm hiển thị modal với các lựa chọn từ secondaryOptions
function showSecondaryOptions(selectedItem) {
    console.log(selectedItem[0])
    const filteredResults = mml_data.filter(item => item[0] === selectedItem[0]); // Lọc các dòng dựa trên lựa chọn
    const modal = document.getElementById("secondaryModal");
    const modalOptions = document.getElementById("modalOptions");
    modalOptions.innerHTML = ''; // Xóa nội dung cũ

    // Hiển thị modal với các lựa chọn
    filteredResults.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("modal-option");
        
        // Hiển thị cả cột ID (mml_data[0]) và Mô tả (mml_data[2])
        optionDiv.textContent = `${option[1]} - ${option[2]}`; // Ghép ID và Mô tả thành chuỗi
        
        optionDiv.addEventListener("click", () => {
            handleModalSelection_nhap(option); // Gọi hàm khi người dùng chọn một tùy chọn
        });
        modalOptions.appendChild(optionDiv);
    });

    // Hiển thị modal
    modal.style.display = 'flex';
}

// Xử lý khi người dùng chọn một mục trong modal
function handleModalSelection_nhap(selectedOption) {
    console.log("Người dùng đã chọn:", selectedOption);
    [type_nhap,sku_name_nhap,part_number_nhap,unit_nhap,price_mml_nhap,vendor_id_nhap,vendor_name_nhap] = selectedOption
    
    document.getElementById("sku_name_nhap").textContent = sku_name_nhap
    document.getElementById("sku_id_nhap").textContent = part_number_nhap

    const found_vendor = mml_data.filter(u => u[0] === type_nhap);
    const vendor_list = found_vendor.map(row => `${row[5]} | ${row[6]}`);

    // Loại bỏ các giá trị trùng lặp để tạo danh sách unique
    const uniqueList = [...new Set(vendor_list)];
    // Lấy phần tử select
    const selectElement = document.getElementById("supplier-code");

    // Xóa các tùy chọn cũ (nếu có)
    selectElement.innerHTML = "";
    
    // Thêm tùy chọn trống đầu tiên
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "";
    defaultOption.disabled = true; // Làm cho tùy chọn này không thể chọn
    defaultOption.selected = true; // Đặt làm tùy chọn mặc định
    selectElement.appendChild(defaultOption);

    // Thêm các tùy chọn từ uniqueList
    uniqueList.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.text = value;
        selectElement.appendChild(option);
    });

    // Xử lý sự kiện khi người dùng chọn một mục
    selectElement.addEventListener("change", function() {
        const selectedValue = selectElement.value;
        const partBeforeDash = selectedValue.split(" | ")[0]; // Lấy phần trước dấu "-"
        console.log(partBeforeDash); // In ra giá trị, hoặc xử lý tùy ý
        vendor_id_nhap2 = partBeforeDash
        closeModal(); // Đóng modal
    });
    closeModal();

    // Bạn có thể cập nhật giao diện hoặc lưu giá trị chọn này theo yêu cầu của bạn
}

function submit_nhap() {
    const warehouse = document.getElementById("warehouse").value;
    const quantity = document.getElementById("quantity").value;
    const storage_location = document.getElementById("storage-location").value;
    const expiry_date = document.getElementById("expiry-date").value;
    const unit_price = document.getElementById("unit-price").value;
    const material_type = document.getElementById("material-type").value;
    const storageInput = document.getElementById("storage-location");
    const inputValue = storageInput.value;
    
    const found_loc = location_data.find(u => u[0] === inputValue);
    console.table(found_loc)
    // Kiểm tra nếu giá trị nhập không có trong location_data
    if (storage_location === "") {
        alert("Bạn chưa nhập vị trí")
        document.getElementById("storage-location").focus()
        return
    }
    
    if (!found_loc) {
        alert("Nhập sai vị trí, vui lòng thử lại")
        document.getElementById("storage-location").value = ""
        document.getElementById("storage-location").focus()
        return
    }
    
    if (warehouse === "") {
        alert("Bạn chưa chọn Mã chi nhánh")
        return
    }

    if (material_type === "") {
        alert("Bạn chưa nhập loại vật tư")
        document.getElementById("material-type").focus()
        return
    }

    if (quantity === "") {
        alert("Bạn chưa nhập số lượng")
        document.getElementById("quantity").focus()
        return
    }

    if (unit_price === "") {
        alert("Bạn chưa nhập đơn giá")
        document.getElementById("unit-price").focus()
        return
    }

    if (expiry_date === "") {
        expiry_date_nhap = "-"
    } else {
        expiry_date_nhap = expiry_date
    }
    
    if (vendor_id_nhap2 === "") {
        alert("Bạn chưa chọn mã nhà cung cấp")
        return
    }

    if (sku_name_nhap === "" || part_number_nhap === "") {
        alert("Bạn chưa chọn vật tư")
        return
    }

    try {
        let stock_in_table = new FormData();
        stock_in_table.append("wh", warehouse);
        stock_in_table.append("operator", sessionStorage.getItem("fullname"));
        stock_in_table.append("type", type_nhap);
        stock_in_table.append("vendor_id", vendor_id_nhap);
        stock_in_table.append("qty", quantity);
        stock_in_table.append("loc", storage_location);
        stock_in_table.append("sku_name", sku_name_nhap);
        stock_in_table.append("sku_id", part_number_nhap);
        stock_in_table.append("expiry", expiry_date_nhap);
        stock_in_table.append("price", unit_price);

        fetch('https://script.google.com/macros/s/AKfycbx4Z3ko2bspVPllG2bmOqUpvaasTHT6Texb76HG7J3WX4a7WxHHAsgV12kxvw0FlnRv/exec', {
            method: 'POST',
            mode: 'no-cors',
            body: stock_in_table
        }).then(response => response.text)
            .then(result => console.log('Đã gửi data thành công'))
            .catch(error => console.error('Error:', error));
        }
    catch (error) {
        console.error('Error:', error);
    }
    reset_nhap()
    setTimeout(() => {
        load_data_nhap_without_loading()
    }, 5000);
}

function reset_nhap() {
    type_nhap = ''
    sku_name_nhap = ''
    part_number_nhap = ''
    unit_nhap = ''
    price_mml_nhap = ''
    vendor_id_nhap = ''
    vendor_id_nhap2 = ''
    vendor_name_nhap = ''
    expiry_date_nhap = '-'

    document.getElementById("quantity").value = ""
    document.getElementById("storage-location").value = ""
    document.getElementById("expiry-date").value = ""
    document.getElementById("unit-price").value = ""
    document.getElementById("material-type").value = ""

    document.getElementById("sku_name_nhap").textContent = ""
    document.getElementById("sku_id_nhap").textContent = ""

    const selectElement = document.getElementById("supplier-code");

    // Xóa các tùy chọn cũ (nếu có)
    selectElement.innerHTML = "";
}

function validateInput(input) {
    // Lưu vị trí con trỏ hiện tại
    const cursorPosition = input.selectionStart;

    // Chỉ cho phép nhập số và dấu chấm
    const sanitizedValue = input.value.replace(/[^0-9.]/g, '');

    // Kiểm tra nếu có thay đổi trong giá trị nhập
    if (sanitizedValue !== input.value) {
        input.value = sanitizedValue;
        
        // Khôi phục lại vị trí con trỏ sau khi thay đổi giá trị
        input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    }
}

document.getElementById("storage-location").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Kiểm tra phím Enter
        check_loc_nhap()
    }
});

document.getElementById("quantity").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Kiểm tra phím Enter
        document.getElementById("unit-price").focus()
    }
});

document.getElementById("unit-price").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Kiểm tra phím Enter
        document.getElementById("storage-location").focus()
    }
});

function check_loc_nhap() {
    const storageInput = document.getElementById("storage-location");
    const inputValue = storageInput.value;
    
    const found_loc = location_data.find(u => u[0] === inputValue);
    console.table(found_loc)
    // Kiểm tra nếu giá trị nhập không có trong location_data
    if (!found_loc) {
        alert("Nhập sai vị trí, vui lòng thử lại")
    } else {
        alert("oke")
    }
}

///////////////////////////////////
// Hàm đóng modal
function closeModal() {
    const modal = document.getElementById("secondaryModal");
    modal.style.display = 'none';
}

// Hàm loại bỏ dấu tiếng Việt
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Ẩn dropdown khi không có kết quả
function hideDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.style.display = 'none';
}

function hideDropdown_xuat() {
    const dropdown = document.getElementById("dropdown_xuat");
    dropdown.style.display = 'none';
}

// Gán sự kiện input với debounce để giảm số lần tìm kiếm
document.getElementById("material-type").addEventListener("input", debounce(handleMaterialTypeInput, 400));


///////////////////////////////////////////////////
let user_data = [];
let mml_data = [];
let location_data = [];
let onhand_data = [];

async function load_user() {
    return fetch('https://script.google.com/macros/s/AKfycbzwWx6hpZ-C5zcjFDeTjJv77nlWZ2tLlHqtg1SUZS37dOoF5c_ua8ITxzHsX-d5zIhH/exec')
        .then(res => res.json())
        .then(data => {
            user_data = data.content;
            console.log("Dữ liệu người dùng đã tải xong.");
        });
}

async function load_mml() {
    return fetch('https://script.google.com/macros/s/AKfycbxIwRRg9dRNtBp6ekhJq6j-qNLwBKT3Sny0KSLChLZHuXGnRNxSij7n58ztQtZAVSL5LA/exec')
        .then(res => res.json())
        .then(data => {
            mml_data = data.content;
            console.log("Dữ liệu tồn đã tải xong.");
        });
}

async function load_location() {
    return fetch('https://script.google.com/macros/s/AKfycbyH_slEDfveGTjZWvAtBMA1obtr8U136jdU0SvmPAg0eV69rZiqwZcujowKe0TcV8-m/exec')
        .then(res => res.json())
        .then(data => {
            location_data = data.content;
            console.log("Dữ liệu loc đã tải xong.");
        });
}

async function load_onhand() {
    return fetch('https://script.google.com/macros/s/AKfycbyz9iwzqC3ZWnKKFEtEkaVOqYrnUgbBjrkKa0ZNwO4feK5blUVKRaoSs9TNTtFJDXA/exec')
        .then(res => res.json())
        .then(data => {
            onhand_data = data.content;
            console.log("Dữ liệu onhand đã tải xong.");
        });
}


document.addEventListener("DOMContentLoaded", async () => {
    await load_user(); // Tải dữ liệu người dùng trước khi cho phép đăng nhập

    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginFrame = document.getElementById("login-frame");
    const welcomeFrame = document.getElementById("welcome-frame");
    const welcomeMessage = document.getElementById("welcome-message");
    const logoutButton = document.getElementById("logout-btn");

    const EXPIRATION_TIME = 3 * 24 * 60 * 60 * 1000; // 3 ngày

    checkLoginStatus();

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Tìm user trong user_data dựa trên tên đăng nhập và mật khẩu
        const user = user_data.find(u => u[2] === username && u[3] === password);

        if (user) {
            const fullname = user[0];
            const wh = user[1]
            // Xác định quyền của user dựa trên các cột 4, 5, 6, 7 trong user_data
            const permissions = {
                import: user[4] === "x",
                export: user[5] === "x",
                export_data: user[6] === "x",
                mml: user[7] === "x"
            };

            // Ghi log quyền để kiểm tra
            console.log("Quyền truy cập của người dùng:", permissions);

            // Lưu quyền và thông tin người dùng vào sessionStorage
            sessionStorage.setItem("permissions", JSON.stringify(permissions));
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("fullname", fullname);
            sessionStorage.setItem("wh", wh);
            loginSuccess(username);
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    });

    function loginSuccess(username) {
        const expirationTime = Date.now() + EXPIRATION_TIME;
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("expirationTime", expirationTime.toString());
    
        displayWelcomeFrame();
        if (welcomeMessage) {
            welcomeMessage.textContent = "Welcome, " + username;
        }
    
        // Gọi hàm khởi tạo combobox sau khi hoàn tất đăng nhập
        initializeWarehouseOptions();
        initializeWarehouseOptions2()
    }
    

    function checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        const expirationTime = sessionStorage.getItem("expirationTime");
        const username = sessionStorage.getItem("username");
        
        if (isLoggedIn === "true" && expirationTime && Date.now() < parseInt(expirationTime)) {
            displayWelcomeFrame();
            if (welcomeMessage) {
                welcomeMessage.textContent = "Welcome, " + (username || "User");
            }
        } else {
            logout();
        }
    }

    function logout() {
        sessionStorage.clear(); // Xóa tất cả dữ liệu sessionStorage

        displayLoginFrame();
        // alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");

        usernameInput.value = "";
        passwordInput.value = "";
    }

    function displayLoginFrame() {
        loginFrame.style.display = "flex";
        welcomeFrame.style.display = "none";
    }

    function displayWelcomeFrame() {
        loginFrame.style.display = "none";
        welcomeFrame.style.display = "flex";
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }

    // Hàm hiển thị frame theo id, chỉ cho phép truy cập nếu có quyền
    
});


async function load_data_nhap() {
    // Show the loading indicator
    document.getElementById("loadingIndicator").style.display = "block";

    await Promise.all([load_mml(), load_location()]); // Run both fetch calls in parallel

    // Hide the loading indicator once loading is complete
    document.getElementById("loadingIndicator").style.display = "none";
}

async function load_data_xuat() {
    // Show the loading indicator
    document.getElementById("loadingIndicator").style.display = "block";

    await Promise.all([load_onhand()]); // Run both fetch calls in parallel

    // Hide the loading indicator once loading is complete
    document.getElementById("loadingIndicator").style.display = "none";
}

function load_data_nhap_without_loading() {
    load_mml();
    load_location();
}


function showFrame(id) {
    const permissions = JSON.parse(sessionStorage.getItem("permissions")) || {};

    // Log to check access permissions
    console.log("Checking access for frame:", id);
    console.log("Current permissions:", permissions);

    // Allow access only if it's Home or the user has permission for the frame
    if (id === "home" || permissions[id] === true) {
        const frames = document.querySelectorAll('.frame');
        frames.forEach(frame => frame.classList.remove('active'));

        const activeFrame = document.getElementById(id);
        if (activeFrame) {
            if (id === 'import') {
                // Load data and then show the frame
                load_data_nhap().then(() => {
                    activeFrame.classList.add('active');
                    console.log("Access granted to frame:", id);
                });
            } else if (id === 'export') {
                // Load data and then show the frame
                load_data_xuat().then(() => {
                    activeFrame.classList.add('active');
                    console.log("Access granted to frame:", id);
                });
            } else {
                activeFrame.classList.add('active');
                console.log("Access granted to frame:", id);
            }
        }
    } else {
        alert("You do not have permission to access this tab.");
        console.log("Access denied to frame:", id);
    }
}

///// XUẤT //////
function clear_label_xuat() {
    document.getElementById("loc_xuat").textContent = ""
    document.getElementById("exp_date_xuat").textContent = ""
    document.getElementById("ib_date_xuat").textContent = ""
    document.getElementById("sku_name_xuat").textContent = ""
    document.getElementById("sku_id_xuat").textContent = ""
    document.getElementById("cur_onhand").textContent = ""
}

function reset_xuat() {
    clear_label_xuat()
    document.getElementById("quantity_xuat").value = ""
    document.getElementById("customer_name").value = ""
    document.getElementById("order_xuat").value = ""
    document.getElementById("material-type_xuat").value = ""
    

    wh_xuat = ''
    type_xuat = ''
    sku_id_xuat = ''
    loc_xuat = ''
    expiry_date_xuat = ''
    inbound_date_xuat = ''
    price_inbound_xuat = ''
    qty_ib_xuat = ''
    qty_first_xuat = ''
    qty_ob_xuat = ''
    qty_last_xuat = ''
    sku_name_xuat = ''
    price_xuat = ''
    amount_xuat = ''
    unit_xuat = ''
}

function handleMaterialTypeInput_xuat(event) {
    const wh_value = document.getElementById("warehouse_xuat").value
        if (wh_value === "") {
            alert("Vui lòng chọn mã chi nhánh trước")
            modalOptions.innerHTML = ''
            closeModal()

            document.getElementById("material-type_xuat").value = ""
            return
        }
    const searchTerm = removeAccents(event.target.value).toUpperCase(); // Chuyển đổi thành uppercase không dấu
    const results = onhand_data.filter(item => removeAccents(item[1]).toUpperCase().includes(searchTerm) && item[0] === wh_value); // Tìm kiếm không dấu
    // Hiển thị kết quả tìm kiếm từ cột mml_data[1]
    if (results.length > 0) {
        showSearchResults2(results.map(item2 => item2[1]), results); // Truyền danh sách tên vật tư và dữ liệu gốc
    } else {
        hideDropdown_xuat(); // Ẩn dropdown nếu không có kết quả
        showTemporaryLabel("Không có kết quả")
        console.log("Không tìm thấy kết quả.");

    }
}

function showSearchResults2(displayList, fullData) {
    clear_label_xuat()
    const dropdown = document.getElementById("dropdown_xuat");
    dropdown.innerHTML = ''; // Xóa nội dung cũ

    // Hiển thị dropdown
    dropdown.style.display = 'block';

    // Sử dụng Set để giữ lại các giá trị duy nhất
    const uniqueItems = [...new Set(displayList)];

    // Tạo các mục dropdown từ danh sách uniqueItems
    uniqueItems.forEach((item, index) => {
        const dropdownItem = document.createElement("div");
        dropdownItem.classList.add("dropdown-item");
        dropdownItem.textContent = item;

        // Lấy chỉ số của phần tử đầu tiên trong fullData tương ứng với item
        const originalIndex = fullData.findIndex(dataItem => dataItem[1] === item);
        console.log(originalIndex)
        
        // Xử lý sự kiện khi người dùng chọn một mục từ dropdown
        dropdownItem.addEventListener("click", () => {
            document.getElementById("material-type_xuat").value = item; // Gán lựa chọn vào ô nhập liệu
            dropdown.style.display = 'none'; // Ẩn dropdown sau khi chọn
            
            // Gọi hàm để xử lý lựa chọn đầu tiên và tìm danh sách thứ hai
            showSecondaryOptions2(fullData[originalIndex]);
        });

        dropdown.appendChild(dropdownItem);
    });
}

function showSecondaryOptions2(selectedItem) {
    const filteredResults = onhand_data.filter(item => item[1] === selectedItem[1] && item[10] > 0); // Lọc các dòng dựa trên lựa chọn
    const modal = document.getElementById("secondaryModal");
    const modalOptions = document.getElementById("modalOptions");
    modalOptions.innerHTML = ''; // Xóa nội dung cũ

    // Hiển thị modal với các lựa chọn
    filteredResults.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("modal-option");
        
        // Hiển thị cả cột ID (mml_data[0]) và Mô tả (mml_data[2])
        optionDiv.textContent = `${option[2]} | ${option[11]}`; // Ghép ID và Mô tả thành chuỗi
        
        optionDiv.addEventListener("click", () => {
            handleModalSelection_nhap2(option); // Gọi hàm khi người dùng chọn một tùy chọn
        });
        modalOptions.appendChild(optionDiv);
    });

    // Hiển thị modal
    modal.style.display = 'flex';
}


document.getElementById("material-type_xuat").addEventListener("input", debounce(handleMaterialTypeInput_xuat, 400));

function showTemporaryLabel(message) {
    const label = document.getElementById("tempLabel");
    
    if (label) {
        label.textContent = message;       // Set the label's text
        label.style.display = 'block';     // Show the label
        
        // Hide the label after 5 seconds (5000 milliseconds)
        setTimeout(() => {
            label.style.display = 'none';
        }, 5000);
    } else {
        console.warn("Label element not found!");
    }
}


function handleModalSelection_nhap2(selectedOption) {
    const wh_value = document.getElementById("warehouse_xuat").value;
    console.log("Người dùng đã chọn:", selectedOption);

    [wh_xuat, type_xuat, sku_id_xuat, loc_xuat, expiry_date_xuat, inbound_date_xuat, price_inbound_xuat, qty_ib_xuat, qty_first_xuat, qty_ob_xuat, qty_last_xuat, sku_name_xuat, price_xuat, amount_xuat, unit_xuat] = selectedOption;

    document.getElementById("sku_name_xuat").textContent = sku_name_xuat;
    document.getElementById("sku_id_xuat").textContent = sku_id_xuat;
    closeModal();

    var found_table_xuat = onhand_data
        .filter(item => item[10] > 0 && item[1] === type_xuat && item[2] === sku_id_xuat && item[0] === wh_value)
        .map(col => [
            col[1],         // Type
            col[3],         // Location
            col[10],        // Quantity
            col[4] || "-",  // Expiry Date, default to "-"
            col[5]          // Inbound Date
        ]);

    found_table_xuat.sort((a, b) => {
        const expiryA = a[3] === "-" ? Infinity : new Date(a[3]);
        const expiryB = b[3] === "-" ? Infinity : new Date(b[3]);
        const inboundA = new Date(a[4]);
        const inboundB = new Date(b[4]);

        if (expiryA - expiryB !== 0) return expiryA - expiryB;
        return inboundA - inboundB;
    });

    let earliestExpiryDate = found_table_xuat.find(row => row[3] !== "-")?.[3];
    let earliestInboundDate = found_table_xuat[0][3] === "-" ? found_table_xuat[0][4] : null;

    found_table_xuat = found_table_xuat.map(row => {
        let status = "Không thể lấy";
        if (row[3] === earliestExpiryDate || (row[3] === "-" && row[4] === earliestInboundDate)) {
            status = "Pick"; // Assign "Pick" to items that are pickable
        }
        return [...row, status];
    });

    console.table(found_table_xuat);
    displayFoundTableModal(found_table_xuat);
}


function displayFoundTableModal(data) {
    const tableBody = document.getElementById("foundTable").querySelector("tbody");
    tableBody.innerHTML = ''; // Clear any existing rows

    data.forEach((row, rowIndex) => {
        const tableRow = document.createElement("tr");

        // Append each data cell, excluding any previous status column
        row.slice(0, 5).forEach(cellData => {
            const tableCell = document.createElement("td");
            tableCell.textContent = cellData;
            tableRow.appendChild(tableCell);
        });

        // Add the new status cell with the "Pick" button or "Không thể lấy" text
        const statusCell = document.createElement("td");
        if (row[5] === "Pick") {
            const pickButton = document.createElement("button");
            pickButton.textContent = "Pick";
            pickButton.classList.add("pick-button");
            pickButton.addEventListener("click", () => handlePick(row));
            statusCell.appendChild(pickButton);
        } else {
            const statusText = document.createElement("span");
            statusText.textContent = "Không thể lấy";
            statusText.classList.add("status-text");
            statusCell.appendChild(statusText);
        }
        tableRow.appendChild(statusCell);

        tableBody.appendChild(tableRow);
    });

    // Show the modal
    document.getElementById("foundTableModal").style.display = 'block';
}


// Function to handle the "Pick" button click
let qty_xuat_selected = 0
function handlePick(selectedRow) {
    console.log("Selected row for picking:", selectedRow);
    qty_xuat_selected = selectedRow[2]
    document.getElementById("loc_xuat").textContent = selectedRow[1]
    document.getElementById("exp_date_xuat").textContent = selectedRow[3]
    document.getElementById("ib_date_xuat").textContent = selectedRow[4]
    document.getElementById("cur_onhand").textContent = selectedRow[2]
    
    closeFoundTableModal();

    document.getElementById("quantity_xuat").value = ""
    document.getElementById("quantity_xuat").focus()
}

// Function to close the modal
function closeFoundTableModal() {
    document.getElementById("foundTableModal").style.display = 'none';
}

document.getElementById("customer_name").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Kiểm tra phím Enter
        document.getElementById("order_xuat").focus()
    }
});

document.getElementById("order_xuat").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Kiểm tra phím Enter
        document.getElementById("material-type_xuat").focus()
    }
});

document.getElementById("quantity_xuat").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Kiểm tra phím Enter
        submit_xuat()
    }
});

function submit_xuat() {
    const warehouse = document.getElementById("warehouse_xuat").value;
    const quantity = document.getElementById("quantity_xuat").value;
    const material_type = document.getElementById("material-type_xuat").value;
    const customer_name = document.getElementById("customer_name").value;
    const order_xuat = document.getElementById("order_xuat").value;

    const storage_location = document.getElementById("loc_xuat").textContent;
    const sku_name_xuat = document.getElementById("sku_name_xuat").textContent;
    const sku_id_xuat = document.getElementById("sku_id_xuat").textContent;
    const expiry_date = document.getElementById("exp_date_xuat").textContent;
    const inbound_date = document.getElementById("ib_date_xuat").textContent;
    // const qty_xuat_selected = document.getElementById("cur_onhand").textContent;
    
    if (warehouse === "") {
        alert("Bạn chưa chọn chi nhánh")
        document.getElementById("warehouse_xuat").focus()
        return
    }

    if (customer_name === "") {
        alert("Bạn chưa nhập tên khách hàng")
        document.getElementById("customer_name").focus()
        return
    }

    if (order_xuat === "") {
        alert("Bạn chưa nhập mã đơn hàng cần xuất")
        document.getElementById("order_xuat").focus()
        return
    }

    if (material_type === "") {
        alert("Bạn chưa nhập Loại vật tư")
        document.getElementById("material-type_xuat").focus()
        return
    }

    if (sku_name_xuat === "" || sku_id_xuat === "" || expiry_date === "" || inbound_date === "" || storage_location === "") {
        alert("Bạn chưa chọn vật tư")
        return
    }

    if (quantity === "" || quantity <= 0) {
        alert("Số lượng xuất phải > 0")
        document.getElementById("quantity_xuat").value = ""
        document.getElementById("quantity_xuat").focus()
        return
    }

    if (quantity > qty_xuat_selected) {
        alert("Số lượng xuất không được vượt số lượng tồn hiện tại")
        document.getElementById("quantity_xuat").value = ""
        document.getElementById("quantity_xuat").focus()
        return
    }

    try {
        let stock_out_table = new FormData();
        stock_out_table.append("wh", warehouse);
        stock_out_table.append("operator", sessionStorage.getItem("fullname"));
        stock_out_table.append("customer", customer_name);
        stock_out_table.append("vendor_id", vendor_id_nhap);
        stock_out_table.append("order", order_xuat);
        stock_out_table.append("type", material_type);
        stock_out_table.append("qty", quantity);
        stock_out_table.append("loc", storage_location);
        stock_out_table.append("sku_name", sku_name_xuat);
        stock_out_table.append("sku_id", sku_id_xuat);
        stock_out_table.append("exp_date", expiry_date);
        stock_out_table.append("ib_date", "'"+inbound_date);
        fetch('https://script.google.com/macros/s/AKfycbz8quGPI1b-xknFdeiejUbJT2nNXWk5ZwqySgVq4bXehi16n5r-APdMfkd5oElPAcoPIA/exec', {
            method: 'POST',
            mode: 'no-cors',
            body: stock_out_table
        }).then(response => response.text)
            .then(result => console.log('Đã gửi data thành công'))
            .catch(error => console.error('Error:', error));
        }
    catch (error) {
        console.error('Error:', error);
    }
    setTimeout(() => {
        load_onhand();
    }, 5000);
    reset_xuat()
    
}