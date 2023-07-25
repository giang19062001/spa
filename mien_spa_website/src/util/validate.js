const validPassword  = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/ ;
const validName = /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i
const validAddress = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9\s,/()-.]*$/i
export   const schemaUser = {
    usUserName: {
      presence: {
        allowEmpty: false,
        message: "^Họ và tên không được trống",
      },
      format: {
        pattern: validName,
        flags: "i",
        message: "^Họ và tên không bao gồm số",
      },
    },
    usDob: {
      presence: {
        allowEmpty: false,
        message: "^Ngày sinh không được trống",
      },
     
    },
    usAddress: {
      presence: {
        allowEmpty: false,
        message: "^Địa chỉ không được trống",
      },
      length: {
        minimum: 15,
        message: "^Địa chỉ  quá ngắn",
      },
      format: {
        pattern: validAddress,
        flags: "i", 
        message: "^Địa chỉ không bao gồm ký tự đặc biệt ngoài ' / '",
      },

    },
    usPhoneNo: {
      presence: {
        allowEmpty: false,
        message: "^Số điện thoại không được trống",
      },
      numericality: {
        notInteger: true,
        message: "^Số điện thoại không bao gồm ký tự hoặc chữ",
      },
      length: {
        minimum: 10,
        maximum: 10,
        message: "^Số điện thoại phải có 10 số",
      },

    },
  


  };

export const schemaInforOrder = {
  address: {
    presence: {
      allowEmpty: false,
      message: "^Địa chỉ không được trống",
    },
    length: {
      minimum: 15,
      message: "^Địa chỉ quá ngắn",
    },
    format: {
      pattern: validAddress,
      flags: "i", 
      message: "^Địa chỉ không bao gồm ký tự đặc biệt ngoài ' / '",
    },
},

  phone: {
    presence: {
      allowEmpty: false,
      message: "^Số điện thoại không được trống",
    },
    numericality: {
      notInteger: true,
      message: "^Số điện thoại không bao gồm ký tự hoặc chữ",
    },
    length: {
      minimum: 10,
      maximum: 10,
      message: "^Số điện thoại phải có 10 số",
    },

  },
}
export const schemaInforBooking = {
  phone: {
    presence: {
      allowEmpty: false,
      message: "^Số điện thoại không được trống",
    },
    numericality: {
      notInteger: true,
      message: "^Số điện thoại không bao gồm ký tự hoặc chữ",
    },
    length: {
      minimum: 10,
      maximum: 10,
      message: "^Số điện thoại phải có 10 số",
    },

  },
}
export const schemaRegister = {
    username: {
      presence: {
        allowEmpty: false,
        message: "^Họ và tên không được trống",
      },
      length: {
        minimum: 3,
        message: "^Họ và tên không được quá ngắn",
      },
    
      format: {
        pattern: validName,
        flags: "i",
        message: "^Họ và tên không bao gồm số hoặc ký tự đặc biệt",
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Mật khẩu không được trống",
      },
      length: {
        minimum: 8,
        message: "^Mật khẩu phải ít nhất 8 ký tự",
      },
      format: {
        pattern: validPassword,
        flags: "i",
        message: "Mật khẩu phải chứa ít nhất\n 1 chữ viết hoa,\n 1 chữ thường,\n 1 số và 1 kí tự đặc biệt"
      }
    },
    confirmPassword: {
      presence: {
        allowEmpty: false,
        message: "^Mật khẩu không được trống",
      },
      equality: {
        attribute: "password",
        message: "^Mật khẩu không trùng khớp",
      },
    },

    email: {
      presence: {
        allowEmpty: false,
        message: "^Email không được trống",
      },
      email: {
        message: "^Email không đúng định dạng (xxx@xx.xxx)",
      },
    },
  };

  export const schemaLogin = {
    password: {
      presence: {
        allowEmpty: false,
        message: "^Mật khẩu không được trống",
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: "^Email không được trống",
      }
    },
  };

export const schemaPassword = {
  password: {
    presence: {
      allowEmpty: false,
      message: "^Mật khẩu không được trống",
    },
    format: {
      pattern: validPassword,
      flags: "i",
      message: "Mật khẩu phải chứa ít nhất\n 1 chữ viết hoa,\n 1 chữ thường,\n 1 số và 1 kí tự đặc biệt"
    }
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: "^Mật khẩu không được trống",
    },
    equality: {
      attribute: "password",
      message: "^Mật khẩu không trùng khớp",
    },
  },
}
export const schemaChangePassword = {
  passwordOld: {
    presence: {
      allowEmpty: false,
      message: "^Mật khẩu không được trống",
    },
  },
  passwordNew: {
    presence: {
      allowEmpty: false,
      message: "^Mật khẩu không được trống",
    },
    format: {
      pattern: validPassword,
      flags: "i",
      message: "Mật khẩu phải chứa ít nhất\n 1 chữ viết hoa,\n 1 chữ thường,\n 1 số và 1 kí tự đặc biệt"
    }
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: "^Mật khẩu không được trống",
    },
    equality: {
      attribute: "passwordNew",
      message: "^Mật khẩu không trùng khớp",
    },
  },
}

export   const schemaProduct = {
  proName: {
    presence: {
      allowEmpty: false,
      message: "^Tên sản phẩm không được trống",
    },
    length: {
      minimum: 5,
      maximum:50,
      message: "^Tên sản phẩm không được quá ngắn hoặc quá dài",
    },
    format: {
      pattern: validName,
      flags: "i",
      message: "^Tên sản phẩm không bao gồm số hoặc kí tự đặc biệt",
    },
  },
  proContent: {
    presence: {
      allowEmpty: false,
      message: "^Nội dung không được trống",
    },
    length: {
      minimum: 20,
      message: "^Nội dung không được quá ngắn",
    }

  },
  proBrand: {
    presence: {
      allowEmpty: false,
      message: "^Nhãn hàng không được trống",
    },
    length: {
      minimum: 3,
      message: "^Nhãn hàng không được quá ngắn",
    }

  },
  proPrice: {
    presence: {
      allowEmpty: false,
      message: "^Gía tiền không được trống",
    },
    numericality: {
      notInteger: true,
      message: "^Gía tiền không bao gồm ký tự hoặc chữ",
    
    },

    
    
  },
  category_id:{
    presence: {
      allowEmpty: false,
      message: "^Vui lòng chọn thể loại ",
    },
  },
  featureImgPath:{
    presence: {
      allowEmpty: false,
      message: "^Vui lòng chọn ảnh ",
    },
  }



};


export   const schemaService = {
  seName: {
    presence: {
      allowEmpty: false,
      message: "^Tên dịch vụ không được trống",
    },
    length: {
      minimum: 5,
      maximum:50,
      message: "^Tên sản phẩm không được quá ngắn hoặc quá dài",
    },
    format: {
      pattern: validName,
      flags: "i",
      message: "^Tên sản phẩm không bao gồm số hoặc kí tự đặc biệt",
    },
  },
  seDescription: {
    presence: {
      allowEmpty: false,
      message: "^Nội dung chi tiết không được trống",
    },
    length: {
      minimum: 20,
      message: "^Nội dung không được quá ngắn",
    }

  },
  seNote: {
    presence: {
      allowEmpty: false,
      message: "^Nội dung quy trình không được trống",
    },
    length: {
      minimum: 20,
      message: "^Nội dung không được quá ngắn",
    }

  },
  sePrice: {
    presence: {
      allowEmpty: false,
      message: "^Gía tiền không được trống",
    },
    numericality: {
      notInteger: true,
      message: "^Gía tiền không bao gồm ký tự hoặc chữ",
    },
  
    
  },
  seImage:{
    presence: {
      allowEmpty: false,
      message: "^Vui lòng chọn ảnh ",
    },
  }



};


export const shemaCate = {
  cateName: {
    presence: {
      allowEmpty: false,
      message: "^Tên thể loại không được trống",
    },
    length: {
      minimum: 5,
      maximum:15,
      message: "^Tên thể loại không được quá ngắn hoặc quá dài",
    },
    format: {
      pattern: validName,
      flags: "i",
      message: "^Tên thể loại không bao gồm số hoặc kí tự đặc biệt",
    },
  },

} 