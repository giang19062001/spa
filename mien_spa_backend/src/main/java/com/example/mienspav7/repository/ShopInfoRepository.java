package com.example.mienspav7.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.mienspav7.model.ShopInfo;


@Repository
public interface ShopInfoRepository extends JpaRepository<ShopInfo, String>{

}
