import Swal from "sweetalert2";

const ShowError =()=>{
    Swal.fire({
        title: 'ແຈ້ງເຕືອນ',
        icon: 'info',
        html:
          'ເຈົ້າຕ້ອງການທີ່ຈະລົບຂໍ້ມູນນີ້ແທ້ ຫຼື ບໍ່?',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> ຕົກລົງ',
      })
}

export default ShowError;