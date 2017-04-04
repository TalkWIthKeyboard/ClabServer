/**
 * Created by CoderSong on 17/4/1.
 */

$(function () {

  $('.download-btn').attr('disabled', 'disabled');

  $('#sureBtn').click(function () {
    var rule = $('#input-rule').val();
    var url = '/api/edit/page';
    $.ajax({
      url: url,
      type: 'POST',
      data: {
        'rule': rule
      },
      success: function (data) {
        if (data.code.number == 200) {
          $('#output-summary').val(data.data['summary']);
          $('#output-detail').val(data.data['detail']);
          $('.download-btn').removeAttr('disabled');
        }
        else {
          $('#output-summary').empty();
          $('#output-detail').empty();
          alert(data.code.value);
        }
      }
    })
  });

  // 上传组件
  $('.sure-upload-btn').click(function () {
    $('#exampleInputFile').trigger('click');
    $('#exampleInputFile').change(function () {
      var fileName = $(this).val();
      $('#file-name-input').val(getFileName(fileName));
      var file = this.files[0];
      uploadFile(file);
    });
  });

  function getFileName(fileName) {
    var pos = fileName.lastIndexOf("\\");
    return fileName.substring(pos + 1);
  }

  function uploadFile(formData) {
    var fd = new FormData();
    fd.append('file', formData);
    $.ajax({
      url: '/api/edit/file',
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      success: function (data) {
        if (data.code.number == 200) {
          $('#output-summary').val(data.data['summary']);
          $('#output-detail').val(data.data['detail']);
          $('#input-rule').val(data.data['input']);
          $('.download-btn').removeAttr('disabled');
        }
        else {
          $('#output-summary').empty();
          $('#output-detail').empty();
          alert(data.code.value);
        }
      }
    })
  }
});
