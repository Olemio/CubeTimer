  <!-- Insert times to database -->

    
<form method="POST" name="saveTime">
    <input type="text" name="score" value="0">
    <!-- <input type="submit" name="save" value="Lagre score">
    <input type="submit" name="sove" value="Lagre scure"> -->
</form>

<?php 
include 'php/connection_info.php';

    echo "Before func"; 
    echo $_POST["score"]; 
    echo "Before func"; 
    if (isset($_POST["score"])) {

        //Opprette kobling
        $kobling = new mysqli($tjener, $brukernavn, $passord, $database);
    
        //Sjekk om kobling virker
        if ($kobling->connect_error) {
            die("Noe gikk galt: " . $kobling->connect_error);
        }
    
        //Angi UTF-8 som tegnsett
        $kobling->set_charset("utf8");
    
        //Lagrer feltene i variable
        $score = $_POST["score"];
    
        $sql = "INSERT INTO times(time) VALUES ('$score')"; 
        echo "after func"; 
    
        // if ($kobling->query($sql)) {
        //     header("Refresh:0"); // Oppdaterer siden så de nye resultatene blir vist
        // } else {
        //     echo "Noe gikk galt med spørringen $sql ($kobling->error).";
        // }
    }
    
?>