import React from "react";
import "../../css/pageForbidden.scss";
export const PageForbidden = () => {
  return (
    <div className="bgPageForbidden">
      <div class="text-wrapper-PageForbidden">
        <div class="titlePageForbidden" data-content="404">
          403 - FORBIDDEN
        </div>

        <div class="subtitlePageForbidden">
          Rất tiếc, Bạn không có quyền truy cập trang này.
        </div>
        <div class="isiPageForbidden">
          Máy chủ web có thể trả về mã trạng thái HTTP bị cấm 403 để phản hồi
          yêu cầu từ khách hàng về trang web hoặc tài nguyên để cho biết rằng có
          thể truy cập và hiểu yêu cầu của máy chủ, nhưng từ chối thực hiện thêm
          bất kỳ hành động nào. Các phản hồi về mã trạng thái 403 là kết quả của
          việc máy chủ web được định cấu hình để từ chối quyền truy cập, vì một
          lý do nào đó, đối với tài nguyên được yêu cầu bởi máy khách.
        </div>

        <div class="buttonsPageForbidden">
          <a class="buttonPageForbidden" className="aPageForbidden" href="/">
            vỀ TRANG CHỦ
          </a>
        </div>
      </div>
    </div>
  );
};
