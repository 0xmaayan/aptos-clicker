module module_addr::clicker {

    struct Count has key {
        count: u64
    }

    fun init_module(deployer: &signer) {
        move_to(deployer, Count { count: 0 });
    }

    public entry fun click() acquires Count {
        let count = borrow_global_mut<Count>(@module_addr);
        count.count = count.count + 1
    }

    #[view]
    public fun count(): u64 acquires Count {
        let count = borrow_global<Count>(@module_addr);
        count.count
    }
}
