document.getElementById('get-weather').addEventListener('click', () => {
  const cityCode = document.getElementById('city-select').value;

  if (!cityCode) {
    alert('都市を選択してください。');
    return;
  }

  const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // 天気データ（1つ目のオブジェクト）
      const main = data[0];
      //天気に関する地域名のデータ
      const area = main.timeSeries[0].areas[0];

      // 気温データ（2つ目のオブジェクト）
      const temp = data[1];
      //平均気温、最高、最低気温を含むエリアデータ
      const tempsArea = temp.tempAverage?.areas?.[0];

      // 表示部分
      document.querySelector('#publishingOffice td').textContent = main.publishingOffice;
      document.querySelector('#reportDatetime td').textContent = main.reportDatetime;
      document.querySelector('#targetArea td').textContent = area.area.name;

      document.querySelector('#today td').textContent = area.weathers[0];
      document.querySelector('#tomorrow td').textContent = area.weathers[1];
      document.querySelector('#dayAfterTomorrow td').textContent = area.weathers[2];

      // 気温の表示（データがなければ「データなし」）
      document.querySelector('#todayHighTemperature td').textContent =
        tempsArea?.max ? tempsArea.max + '℃' : 'データなし';

      document.querySelector('#todayLowTemperature td').textContent =
        tempsArea?.min ? tempsArea.min + '℃' : 'データなし';
    })
    .catch(error => {
      alert(error.message);
    });
});
