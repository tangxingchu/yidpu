//基础配置表
const configTable = "CREATE TABLE IF NOT EXISTS config (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "config_code VARCHAR(100) NOT NULL UNIQUE," +
    "config_name VARCHAR(100) NULL," +
    "config_value VARCHAR(100) NULL," +
    "local INTEGER DEFAULT 2)";
//sqllite数据库表结构版本更新
const updaterTable = "CREATE TABLE IF NOT EXISTS updater (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "has_show INT NOT NULL DEFAULT 0," +
    "his_version VARCHAR(30) NOT NULL)";
//数据同步表(记录需要本地同步至云端的数据)
//需要本地同步至云端的数据(订单信息)
//start_id 是哪条记录需要同步
const syncTable = "CREATE TABLE IF NOT EXISTS sync_table (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "table_name VARCHAR(45) NOT NULL," +
    "start_id INTEGER NULL)";
//字典项表
const dictionary_item = "CREATE TABLE IF NOT EXISTS dictionary_item (" +
    "id INTEGER PRIMARY KEY," +
    "dict_id INTEGER NOT NULL," +
    "dict_code VARCHAR(45) NOT NULL," +
    "item_code VARCHAR(45) NULL," +
    "item_name VARCHAR(45) NOT NULL," +
    "item_value VARCHAR(45) NOT NULL," +
    "sort_no INTEGER NULL," +
    "enabled CHAR(1) NULL," +
    "remark VARCHAR(200) NULL)";
//场地信息表
const floor = "CREATE TABLE IF NOT EXISTS floor (" +
    "id INTEGER PRIMARY KEY," +
    "floor_name VARCHAR(50) NOT NULL," +
    "floor_desc VARCHAR(500)," +
    "merchant_id INTEGER NOT NULL," +
    "status INTEGER NULL," +
    "sort_no INTEGER NULL)";
//商品分类表
const goods_category = "CREATE TABLE IF NOT EXISTS goods_category (" +
    "id INTEGER PRIMARY KEY," +
    "category_name VARCHAR(45) NOT NULL," +
    "category_desc VARCHAR(400) NULL," +
    "merchant_id INTEGER NOT NULL," +
    "sort_no INTEGER NULL," +
    "create_time DATETIME NULL," +
    "modify_time DATETIME NULL)"; 
//商品表
const goodsTable = "CREATE TABLE IF NOT EXISTS goods (" +
    "id INTEGER PRIMARY KEY," +
    "merchant_id INTEGER NOT NULL," +
    "name VARCHAR(45) NOT NULL," +
    "piny VARCHAR(45) NULL," +
    "unit INTEGER DEFAULT NULL," +
    "cost_price DECIMAL(10,2) NULL," +
    "price DECIMAL(10,2) NOT NULL," +
    "inventory INTEGER DEFAULT 9999," +
    "enabled_waring INTEGER DEFAULT 0," +
    "warning_value INTEGER DEFAULT NULL," +
    "category INTEGER NULL," +
    "status INTEGER DEFAULT 1," +
    "sales_num INTEGER DEFAULT 0," +
    "description VARCHAR(500) NULL," +
    "printer_id INTEGER," +
    "create_time DATETIME NULL," +
    "modify_time DATETIME NULL)"; 
//商品附属属性表
const goodsExtraTable = "CREATE TABLE IF NOT EXISTS goods_extra (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "extra_id INTEGER NOT NULL," +
    "extra_code VARCHAR(45) NOT NULL," +
    "extra_name VARCHAR(100) NULL," +
    "goods_id INTEGER NOT NULL)";
//商品附属属性项表
const goodsExtraItemTable = "CREATE TABLE IF NOT EXISTS goods_extra_item (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "extra_id INTEGER NOT NULL," +
    "dict_item_id INTEGER NOT NULL," +
    "goods_id INTEGER NOT NULL," +
    "price DECIMAL(10,2) NOT NULL)";
//购物车
const shoppingCartTable = "CREATE TABLE IF NOT EXISTS shopping_cart (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "goods_id INTEGER NOT NULL," +
    "num INTEGER NOT NULL DEFAULT 1," +
    "u_id INTEGER NULL," +
    "table_code INTEGER NOT NULL," +
    // "extra_ids VARCHAR(200) NULL," +
    // "extra_names VARCHAR(200) NULL," +
    "remark VARCHAR(500) NULL," +
    "is_printer INTEGER NOT NULL DEFAULT 0," +
    "create_time DATETIME NULL," + 
    "modify_time DATETIME NULL)";
//购物车列表商品所勾选的附属属性
const shoppingCartExtraTable = "CREATE TABLE IF NOT EXISTS shopping_cart_extra (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "goods_id INTEGER NOT NULL," +
    "cart_id INTEGER NOT NULL," +
    "extra_code VARCHAR(100) NOT NULL," +
    "extra_item_value INTEGER NOT NULL)";

//队列元素表
const queueElementTable = "CREATE TABLE IF NOT EXISTS queue_element (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "queue_id INTEGER NOT NULL," +
    "queue_sequence VARCHAR(10) NOT NULL," +
    "queue_number INTEGER NOT NULL," +
    "person_number INTEGER NOT NULL," +
    "sort_no INTEGER NULL," +
    "put_time DATETIME NOT NULL," +
    "poll_time DATETIME NULL," +
    "create_time DATETIME NULL)";

//桌台表
const diner_tableTable = "CREATE TABLE IF NOT EXISTS diner_table (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "table_code VARCHAR(45) NOT NULL UNIQUE," +
    "table_class INTEGER," +
    "table_name VARCHAR(45)," +
    "table_limit INTEGER," +
    "table_description VARCHAR(500)," +
    "floor_id INTEGER NOT NULL," +
    "status INTEGER NOT NULL)";

//打印机设置
const print_setting = "CREATE TABLE IF NOT EXISTS print_setting (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "print_type INTEGER NOT NULL," +
    "print_vid INTEGER," +
    "print_pid INTEGER," +
    "print_ip VARCHAR(16)," +
    "print_port INTEGER," +
    "name VARCHAR(45))";

//常用缓存
const cache_table = "CREATE TABLE IF NOT EXISTS cache (" +
    "name VARCHAR(32)," +
    "value TEXT)";

//测试升级表
const test_updater = "CREATE TABLE IF NOT EXISTS test_updater (" +
    "name VARCHAR(32)," +
    "value TEXT)";

//每日特价表
const goodsDayTable = "CREATE TABLE IF NOT EXISTS goods_day (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "goods_id INTEGER NOT NULL," +
    "price DECIMAL(10,2) NOT NULL," +
    "description VARCHAR(500)," +
    "enabled CHAR(1)," +
    "week INTEGER NOT NULL," +
    "limit_num INTEGER NOT NULL," +
    "effective_time DATETIME NULL," +
    "expired_time DATETIME NULL)";

//商品折扣
const goodsDiscountTable = "CREATE TABLE IF NOT EXISTS goods_discount (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "goods_id INTEGER NOT NULL," +
    "discount_name VARCHAR(45)," +
    "discount_value DECIMAL(10,2) NOT NULL," +
    "description VARCHAR(500)," +
    "enabled CHAR(1)," +
    "effective_time DATETIME NULL," +
    "expired_time DATETIME NULL)";

//减免规则表
const goodsSubtractTable = "CREATE TABLE IF NOT EXISTS goods_subtract (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "constraint_type INTEGER NULL," +
    "consume_price DECIMAL(10,2) NULL," +
    "constraint_time_start TIME NULL," +
    "constraint_time_end TIME NULL," +
    "type INTEGER NOT NULL," +
    "amount1 DECIMAL(10,2) NULL," +
    "discount DECIMAL(10,2) NULL," +
    "amount2 DECIMAL(10,2) NULL," +
    "description VARCHAR(500)," +
    "enabled CHAR(1)," +
    "effective_time DATETIME NULL," +
    "expired_time DATETIME NULL)";

//订单表
const orderTable = "CREATE TABLE IF NOT EXISTS order_table (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "order_no VARCHAR(30) NOT NULL," +
    "pay_order_no VARCHAR(30)," +
    "out_trade_no VARCHAR(100)," +
    "member_id INTEGER NULL," +
    "diners_num INTEGER NOT NULL," +
    "order_status VARCHAR(2)," +
    "order_time DATETIME," +
    "order_channel INTEGER NULL," +
    "order_method INTEGER NULL," +
    "pay_method INTEGER NULL," +
    "total_price DECIMAL(10,2) NOT NULL," +
    "pay_price DECIMAL(10,2) NULL," +
    "exception_price DECIMAL(10,2) NULL," +
    "pay_no VARCHAR(100)," +
    "table_code VARCHAR(100)," +
    "subtract_type INTEGER," +
    "subtract_amount DECIMAL(10,2) NULL," +
    "subtract_remark VARCHAR(1000)," +
    "remark VARCHAR(500)," +
    "create_user VARCHAR(100)," +
    "create_time DATETIME NULL," +
    "wx_openid VARCHAR(50)," +
    "alipay_userid VARCHAR(50)," +
    "seq_number VARCHAR(20)," +
    "end_time DATETIME NULL," +
    "close_time DATETIME NULL," +
    "modify_time DATETIME NULL)";

//历史订单表
const orderHisTable = "CREATE TABLE IF NOT EXISTS order_his_table (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "order_no VARCHAR(30) NOT NULL," +
    "pay_order_no VARCHAR(30)," +
    "out_trade_no VARCHAR(100)," +
    "member_id INTEGER NULL," +
    "diners_num INTEGER NOT NULL," +
    "order_status VARCHAR(2)," +
    "order_time DATETIME," +
    "order_channel INTEGER NULL," +
    "order_method INTEGER NULL," +
    "pay_method INTEGER NULL," +
    "total_price DECIMAL(10,2) NOT NULL," +
    "pay_price DECIMAL(10,2) NULL," +
    "exception_price DECIMAL(10,2) NULL," +
    "pay_no VARCHAR(100)," +
    "table_code VARCHAR(100)," +
    "subtract_type INTEGER," +
    "subtract_amount DECIMAL(10,2) NULL," +
    "subtract_remark VARCHAR(1000)," +
    "remark VARCHAR(500)," +
    "create_user VARCHAR(100)," +
    "create_time DATETIME NULL," +
    "wx_openid VARCHAR(50)," +
    "alipay_userid VARCHAR(50)," +
    "seq_number VARCHAR(20)," +
    "end_time DATETIME NULL," +
    "close_time DATETIME NULL," +
    "modify_time DATETIME NULL," +
    "his_time DATETIME NULL)";

//订单项表
const orderItemTable = "CREATE TABLE IF NOT EXISTS order_item (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "order_id INTEGER NOT NULL," +
    "order_no VARCHAR(30) NOT NULL," +
    "goods_id INTEGER NOT NULL," +
    "goods_price DECIMAL(10,2) NULL," +
    "goods_name VARCHAR(45) NULL," +
    "goods_unit_name VARCHAR(45) NULL," +
    "extra_name VARCHAR(200) NULL," +
    "num INTEGER NULL," +
    "price DECIMAL(10,2) NULL," +
    "order_item_time DATETIME NULL," +
    "order_item_status VARCHAR(2) NULL," +
    "rule_code CHAR(1) NULL," +
    "rule_value DECIMAL(10,2) NULL," +
    "remark VARCHAR(500)," +
    "print_status INTEGER NULL," +
    "modify_time DATETIME NULL)";

//订单项历史表
const orderItemHisTable = "CREATE TABLE IF NOT EXISTS order_item_his (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "order_id INTEGER NOT NULL," +
    "order_no VARCHAR(30) NOT NULL," +
    "goods_id INTEGER NOT NULL," +
    "goods_price DECIMAL(10,2) NULL," +
    "goods_name VARCHAR(45) NULL," +
    "goods_unit_name VARCHAR(45) NULL," +
    "extra_name VARCHAR(200) NULL," +
    "num INTEGER NULL," +
    "price DECIMAL(10,2) NULL," +
    "order_item_time DATETIME NULL," +
    "order_item_status VARCHAR(2) NULL," +
    "rule_code CHAR(1) NULL," +
    "rule_value DECIMAL(10,2) NULL," +
    "remark VARCHAR(500)," +
    "print_status INTEGER NULL," +
    "modify_time DATETIME NULL," +
    "his_time DATETIME NULL)";

//收银流水表
const cashierLogTable = "CREATE TABLE IF NOT EXISTS cashier_log (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "table_code VARCHAR(45) NOT NULL," +
    "cashier_amount DECIMAL(10,2) NOT NULL," +
    "cashier_time DATETIME NOT NULL," +
    "cashier_method INTEGER NOT NULL," +
    "order_no VARCHAR(30) NOT NULL," +
    "cashier_type INTEGER NOT NULL," +
    "cashier_source INTEGER NOT NULL," +
    "remark VARCHAR(500)," +
    "operation_staff VARCHAR(50) NOT NULL," +
    "create_time DATETIME NULL," +
    "modify_time DATETIME NULL)";

//缓存订单
const localCartTable = "CREATE TABLE IF NOT EXISTS local_cart (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "table_code VARCHAR(45) NOT NULL," +
    "cart_data TEXT)";

module.exports = [
    configTable,
    updaterTable,
    syncTable,
    dictionary_item,
    floor,
    goods_category,
    goodsTable,
    goodsExtraTable,
    goodsExtraItemTable,
    shoppingCartTable,
    shoppingCartExtraTable,
    queueElementTable,
    diner_tableTable,
    print_setting,
    cache_table,
    test_updater,
    goodsDayTable,
    goodsDiscountTable,
    goodsSubtractTable,
    orderTable,
    orderHisTable,
    orderItemTable,
    orderItemHisTable,
    cashierLogTable,
    localCartTable,
]
