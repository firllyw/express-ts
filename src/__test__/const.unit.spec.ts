import { Types } from "mongoose";
import Constellation from "../models/constellation-model";

describe('Constellations', () => {
	describe("Create constellations", () => {
		it("Should create a new user successfully!", () => {
			const mockData = {
				name: "Const C",
				abbreviation: "C",
				coordinates: "123,123",
			};
			const spy = jest.spyOn(Constellation, "create").mockReturnValueOnce(mockData);
			Constellation.create(mockData);
			const spyCreatedUser = spy.mock.results[0].value;
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spyCreatedUser.name).toEqual(mockData.name);
			spy.mockReset();
		});
	
		it("Should retruns an error when the name is missing", () => {
			const mockData = {
				abbreviation: "C",
				coordinates: "123,123",
			};
			const spy = jest.spyOn(Constellation, "create").mockReturnValueOnce("Name is required");
			Constellation.create(mockData);
			const spyCreatedUser = spy.mock.results[0].value;
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spyCreatedUser).toEqual("Name is required");
	
			spy.mockReset();
		});
	});
	
	describe("READ constellations", () => {
		it("Should return the list of constellations successfully", () => {
			const mockedList = [
				{
					"_id": "628bd7a96b81451b2ce2bbb2",
					"name": "B Constellations",
					"abbreviation": "B",
					"coordinates": "1192798236,19283123",
					"__v": 0
				},
				{
					"_id": "628bdc972c55c8207c2cba16",
					"name": "A Constellations",
					"abbreviation": "A",
					"coordinates": "1192798236,19283123",
					"__v": 0
				}
			];
	
			const spy = jest.spyOn(Constellation, "find").mockReturnValueOnce(mockedList);
			Constellation.find({});
	
			const spyFetchedConst = spy.mock.results[0].value;
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spyFetchedConst).toHaveLength(2);
			spy.mockReset();
		});
	
		it("Should return an empty list if there are no user", () => {
			const spy = jest.spyOn(Constellation, "find").mockReturnValueOnce([]);
			Constellation.find({});
	
			const spyFetchedConst = spy.mock.results[0].value;
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spyFetchedConst).toHaveLength(0);
			spy.mockReset();
		});
	
		it("Should return a user successfully!", () => {
			const mockData = {
				_id: '628bdc972c55c8207c2cba16',
				name: "Const Name",
				abbreviation: "Const abbr",
				coordinates: "123,123",
			};
			const spy = jest.spyOn(Constellation, "findById").mockReturnValueOnce(mockData);
			Constellation.findById(mockData._id);
	
			const spyFetchedUser = spy.mock.results[0].value;
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spyFetchedUser.name).toEqual(mockData.name);
			spy.mockReset();
		});
	
		it("Should return an error when the user does not exit", () => {
			const id = "628bdc972c55c8207c2cba16";
			const spy = jest.spyOn(Constellation, "findById").mockReturnValueOnce("Constellation not found");
			Constellation.findById(id);
	
			const spyFetchedUser = spy.mock.results[0].value;
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spyFetchedUser).toEqual("Constellation not found");
			spy.mockReset();
		});
	});
	
	describe("UPDATE constellations", () => {
		it("Should update a user successfully!", () => {
			const mockData = {
				_id: '628bdc972c55c8207c2cba16',
				name: "Const Name",
				abbreviation: "Const abbr",
				coordinates: "123,123",
			};
			const spy = jest.spyOn(Constellation, "findByIdAndUpdate").mockReturnValueOnce(mockData);
			Constellation.findByIdAndUpdate(mockData._id, {
				name: "Const new name",
			}, {
				new: true,
			});
	
			const spyUpdatedUser = spy.mock.results[0].value;
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spyUpdatedUser.name).toEqual("onst new name");
			spy.mockReset();
		});
	
		it("Should returns an error if a user does not exist", () => {
			const spy = jest.spyOn(Constellation, "findByIdAndUpdate").mockReturnValueOnce("Id provided does not match any user");
			Constellation.findByIdAndUpdate(Types.ObjectId(), {
				email: "john@gmail.com",
			}, {
				new: true,
			});
	
			const spyUpdatedUser = spy.mock.results[0].value;
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spyUpdatedUser).toEqual("Id provided does not match any user");
			spy.mockReset();
		});
	});

})

