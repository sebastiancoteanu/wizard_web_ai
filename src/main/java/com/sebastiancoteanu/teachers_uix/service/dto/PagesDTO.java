package com.sebastiancoteanu.teachers_uix.service.dto;

import java.io.Serializable;
import java.util.List;

public class PagesDTO implements Serializable {
  public List<PageDTO> getList() {
    return list;
  }

  public void setList(List<PageDTO> list) {
    this.list = list;
  }

  public PagesDTO(List<PageDTO> list) {
    this.list = list;
  }

  public PagesDTO() { }

  private List<PageDTO> list;
}
