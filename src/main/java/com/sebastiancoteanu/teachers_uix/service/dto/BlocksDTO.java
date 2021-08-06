package com.sebastiancoteanu.teachers_uix.service.dto;

import java.io.Serializable;
import java.util.List;

public class BlocksDTO implements Serializable {
  public List<BlockDTO> getList() {
    return list;
  }

  public void setList(List<BlockDTO> list) {
    this.list = list;
  }

  public BlocksDTO(List<BlockDTO> list) {
    this.list = list;
  }

  public BlocksDTO() { }

  private List<BlockDTO> list;
}


