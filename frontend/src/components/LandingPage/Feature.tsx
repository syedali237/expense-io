import barIcon from '../../assets/icons8-bar-chart-50.png';
import expenseIcon from '../../assets/icons8-expenses-66.png';

function Feature() {
  return (
    <div className="bg-primary text-white py-10" data-aos="fade-up"  data-aos-delay="50">
      <h2 className="text-center text-[32px] font-bold mb-8" data-aos="fade-up"  data-aos-delay="100">
        A better way to manage your expenses
      </h2>

      <div className="bg-secondary max-w-[1200px] mx-auto rounded-[36px] px-8 py-6 flex justify-between items-center shadow-lg space-x-2" data-aos="fade-up"  data-aos-delay="100">
        <div className="flex items-center space-x-4">
          <div className="text-black">
            <img src={expenseIcon} className="w-15 h-15 object-contain" alt="Search Icon"
            ></img>
          </div>
          <div>
            <h3 className="text-black text-lg font-bold">Track Expenses</h3>
            <p className="text-gray-700">
              Add expense according to the category and track them easily.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-black">
            <img src={barIcon} className="w-10 h-10 object-contain" alt="Bulb Icon"
            ></img>
          </div>
          <div>
            <h3 className="text-black text-lg font-bold">Graphical Analysis</h3>
            <p className="text-gray-700">
              Visualize your spending patterns with intuitive bar graphs.
            </p>
          </div>
        </div>

        {/* <div className="flex items-center space-x-4">
          <div className="text-black">
            <img  className="w-[4rem] h-[4rem] object-contain" alt="Search Icon"
            ></img>
          </div>
          <div>
            <h3 className="text-black text-lg font-bold">Events Sorting</h3>
            <p className="text-gray-700">
              Filter your events by date, earliest and more.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Feature;