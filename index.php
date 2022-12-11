<?php
    include 'php/connection_info.php';
    include 'php/insertTable.php'
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
</head>
<body>
    <div>
        <h1 id="scramble"></h1>
    </div>
    <div> <!--Timer-->
        <h1 id="timerClock">0.00</h1> 
    </div>
    <table id="listOfAverages"> <!--Pannel displaying time/avreages and best time/averages -->
        <tr>
            <th></th>
            <th>current</th>
            <th>best</th>
        </tr>
        <tr>
            <th>Time</th>
            <td class="times" id="currentTime">-</td>
            <td class="times" id="bestTime">-</td>
        </tr>
        <tr>
            <th>Ao5</th>
            <td class="times" id="averageOf5">-</td>
            <td class="times" id="bestAverageOf5">-</td>
        </tr>
        <tr>
            <th>Ao12</th>
            <td class="times" id="averageOf12">-</td>
            <td class="times" id="bestAverageOf12">-</td>
        </tr>
        <tr>
            <th>Ao100</th>
            <td class="times" id="averageOf100">-</td>
            <td class="times" id="bestAverageOf100">-</td>
        </tr>

    </table>

    <table id="listOfTimes"><!--Pannel displaying solve-number, times, avg5, avg12-->
        <tr>
            <th id="timePannelHeader"> Solve: 0 <br> Mean: DNF</th>
        </tr>
        <tr>
            <th>solve</th>
            <th>Time</th>
            <th>Ao5</th>
            <th>Ao12</th>
        </tr>
        <tbody id="timeTable">
            
        </tbody>
    </table>

    
  
    <!-- Select times from database -->
    <?php
    $sqlSelect = "SELECT time FROM times;";
    $result = mysqli_query($conn, $sqlSelect);
    $times = array();
    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) { 
            $times[] = $row;
        }
    }
    ?>
    <script>
        var databaseTimeList = <?php echo json_encode($times); ?>; //Put database times into an js array
    </script>

    <script src="js/script.js"></script>
</body>
</html>