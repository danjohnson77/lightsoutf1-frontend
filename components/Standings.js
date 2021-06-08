import React from "react";

const Standings = () => {
  return (
    <>
      <h1 className="flex-none">STANDINGS</h1>
      <div className="flex flex-col  bg-offBlack h-full">
        <div className="flex flex-none justify-between mx-auto w-11/12 py-2">
          <select name="year" id="year" className="bg-transparent">
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <select name="type" id="type" className="bg-transparent">
            <option value="drivers">DRIVERS</option>
            <option value="constructors">CONSTRUCTORS</option>
          </select>
        </div>
        <table className="font-secondary table-fixed text-center text-sm flex-grow">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>Lewis HAMILTON</td>
              <td>Mercedes</td>
              <td>125</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Standings;
