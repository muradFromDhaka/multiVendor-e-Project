package com.abc.SpringSecurityExample.repository;

import com.abc.SpringSecurityExample.entity.Order;
import com.abc.SpringSecurityExample.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>{

//	List<Order> findByUserId(Long userId);
//    List<Order> findByUserUserName(String userName);

    List<Order> findByUser(User user);

}
