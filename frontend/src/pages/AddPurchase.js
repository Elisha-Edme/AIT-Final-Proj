const AddPurchase = () => {
 return (
            <div>
                <h3>Add a Purchase</h3>
                <form method="POST" action="">
                    <label>Retailer</label> <input name="Retailer" type="text" />
                    <label>Purchase Time</label> <input name="Time" type="date" />
                    <label>Cost</label> <input name="Cost" type="text" />
                    <label>Payment Method</label> <input name="Method" type="text" />
                    <label>Category</label> <input name="Category" type="text" />
                    <input type="submit" />
                </form>
            </div>
        )
};

export default AddPurchase;