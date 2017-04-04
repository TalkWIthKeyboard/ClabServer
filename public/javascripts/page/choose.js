/**
 * Created by CoderSong on 17/3/15.
 */

$(document).ready(function () {

  var url = '/api/choose/result';
  $('#submitBtn').click(function () {
    var chooseData = $('#chooseInput').val() || false;
    if (chooseData) {
      $.ajax({
        url: url,
        type: 'POST',
        data: {
          'choose': chooseData
        },
        success: function (data) {
          $('#resultTxt').val(data.data.results)
        }
      })
    } else {
      alert('请输入内容!');
    }
  })
});