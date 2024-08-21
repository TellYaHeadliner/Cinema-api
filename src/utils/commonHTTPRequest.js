function httpres500(){
    console.error(`Error resseting password:`, error);
    res.status(500).json({ success: false, error: 'Internal server error'})
}

module.exports = httpres500;